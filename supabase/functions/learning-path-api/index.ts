import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? '',
);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname;
    const method = req.method;

    // GET /api/courses/{courseId}/path
    if (method === 'GET' && path.match(/\/api\/courses\/[^\/]+\/path$/)) {
      const courseId = path.split('/')[3];
      
      // Get course with units, skills, and user progress
      const { data: course, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();

      if (courseError) throw courseError;

      const { data: units, error: unitsError } = await supabase
        .from('units')
        .select(`
          *,
          skills(*),
          checkpoints(*)
        `)
        .eq('course_id', courseId)
        .order('order_index');

      if (unitsError) throw unitsError;

      // Get user's auth info
      const authHeader = req.headers.get('Authorization');
      if (authHeader) {
        const token = authHeader.replace('Bearer ', '');
        const { data: { user } } = await supabase.auth.getUser(token);
        
        if (user) {
          // Get user's child profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', user.id)
            .single();

          if (profile) {
            // Get skill progress for this child
            const { data: skillProgress } = await supabase
              .from('user_skill_progress')
              .select('*')
              .eq('child_id', profile.id);

            // Get review queue items
            const { data: reviewItems } = await supabase
              .from('review_queue')
              .select('*')
              .eq('child_id', profile.id)
              .is('completed_at', null);

            // Merge progress data with skills
            units.forEach(unit => {
              unit.skills.forEach(skill => {
                const progress = skillProgress?.find(p => p.skill_id === skill.id);
                skill.userProgress = progress || {
                  crown_level: 0,
                  total_xp: 0,
                  state: 'locked'
                };
              });
            });

            return new Response(JSON.stringify({
              course,
              units,
              userProgress: {
                skillProgress,
                reviewQueue: reviewItems
              }
            }), {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          }
        }
      }

      return new Response(JSON.stringify({ course, units }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // GET /api/skills/{skillId}/lessons
    if (method === 'GET' && path.match(/\/api\/skills\/[^\/]+\/lessons$/)) {
      const skillId = path.split('/')[3];
      const level = url.searchParams.get('level') || '1';

      const { data: exercises, error } = await supabase
        .from('exercises')
        .select('*')
        .eq('skill_id', skillId)
        .eq('crown_level', parseInt(level))
        .order('created_at');

      if (error) throw error;

      return new Response(JSON.stringify({
        skillId,
        crownLevel: parseInt(level),
        exercises
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // POST /api/sessions/{sessionId}/exerciseResult
    if (method === 'POST' && path.match(/\/api\/sessions\/[^\/]+\/exerciseResult$/)) {
      const sessionId = path.split('/')[3];
      const body = await req.json();
      
      const authHeader = req.headers.get('Authorization');
      if (!authHeader) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const token = authHeader.replace('Bearer ', '');
      const { data: { user } } = await supabase.auth.getUser(token);
      
      if (!user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Get user's profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!profile) {
        return new Response(JSON.stringify({ error: 'Profile not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Get exercise info
      const { data: exercise } = await supabase
        .from('exercises')
        .select('skill_id, xp_reward')
        .eq('id', body.exerciseId)
        .single();

      if (!exercise) {
        return new Response(JSON.stringify({ error: 'Exercise not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Record exercise attempt
      const { error: historyError } = await supabase
        .from('user_exercise_history')
        .insert({
          child_id: profile.id,
          exercise_id: body.exerciseId,
          skill_id: exercise.skill_id,
          session_id: sessionId,
          correct: body.correct,
          response: body.response,
          time_taken_seconds: body.timeTaken,
          hints_used: body.hintsUsed || 0,
          attempts: body.attempts || 1,
          xp_awarded: body.correct ? exercise.xp_reward : 0
        });

      if (historyError) throw historyError;

      // Update skill progress
      let bonusXp = 0;
      let crownLevelUp = false;
      
      if (body.correct) {
        // Get current progress
        const { data: currentProgress } = await supabase
          .from('user_skill_progress')
          .select('*')
          .eq('child_id', profile.id)
          .eq('skill_id', exercise.skill_id)
          .single();

        const newXp = (currentProgress?.total_xp || 0) + exercise.xp_reward;
        const newCrownLevel = Math.min(Math.floor(newXp / 100), 5);
        const oldCrownLevel = currentProgress?.crown_level || 0;
        
        crownLevelUp = newCrownLevel > oldCrownLevel;
        
        // Upsert skill progress
        const { error: progressError } = await supabase
          .from('user_skill_progress')
          .upsert({
            child_id: profile.id,
            skill_id: exercise.skill_id,
            crown_level: newCrownLevel,
            total_xp: newXp,
            last_practice_date: new Date().toISOString().split('T')[0],
            current_streak: (currentProgress?.current_streak || 0) + 1,
            state: newCrownLevel >= 5 ? 'mastered' : 'completed'
          });

        if (progressError) throw progressError;

        // Schedule spaced repetition review
        await supabase.rpc('schedule_skill_review', {
          p_child_id: profile.id,
          p_skill_id: exercise.skill_id,
          p_performance_quality: 1
        });

        // Schedule unit review if crown level up
        if (crownLevelUp) {
          await supabase.rpc('schedule_unit_review_after_crown', {
            p_child_id: profile.id,
            p_skill_id: exercise.skill_id
          });
        }
      } else {
        // Schedule remedial review for incorrect answer
        await supabase.rpc('schedule_skill_review', {
          p_child_id: profile.id,
          p_skill_id: exercise.skill_id,
          p_performance_quality: 0
        });
      }

      return new Response(JSON.stringify({
        success: true,
        result: {
          exerciseId: body.exerciseId,
          correct: body.correct,
          xpAwarded: body.correct ? exercise.xp_reward : 0,
          bonusXp,
          crownLevelUp
        }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // GET /api/users/{userId}/schedule
    if (method === 'GET' && path.match(/\/api\/users\/[^\/]+\/schedule$/)) {
      const authHeader = req.headers.get('Authorization');
      if (!authHeader) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const token = authHeader.replace('Bearer ', '');
      const { data: { user } } = await supabase.auth.getUser(token);
      
      if (!user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Get user's profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      // Get today's review items
      const { data: todayItems } = await supabase
        .from('review_queue')
        .select(`
          *,
          skills(title, icon, description)
        `)
        .eq('child_id', profile.id)
        .eq('due_date', new Date().toISOString().split('T')[0])
        .is('completed_at', null)
        .order('priority', { ascending: false })
        .limit(10);

      // Get upcoming items
      const { data: upcomingItems } = await supabase
        .from('review_queue')
        .select(`
          *,
          skills(title, icon, description)
        `)
        .eq('child_id', profile.id)
        .gt('due_date', new Date().toISOString().split('T')[0])
        .is('completed_at', null)
        .order('due_date')
        .limit(20);

      return new Response(JSON.stringify({
        userId: user.id,
        schedule: {
          today: todayItems || [],
          upcoming: upcomingItems || []
        }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in learning-path-api function:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});