import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type Profile = Tables<'profiles'>;
type Enrollment = Tables<'enrollments'>;
type Course = Tables<'courses'>;
type DailyQuest = Tables<'daily_quests'>;
type QuestCompletion = Tables<'quest_completions'>;
type UserBadge = Tables<'user_badges'>;
type Badge = Tables<'badges'>;
type Streak = Tables<'streaks'>;

interface ChildDashboardData {
  enrollments: (Enrollment & { course: Course })[];
  dailyQuests: DailyQuest[];
  questCompletions: QuestCompletion[];
  userBadges: (UserBadge & { badge: Badge })[];
  streak: Streak | null;
  loading: boolean;
}

export const useChildDashboardData = (childProfile: Profile | null): ChildDashboardData => {
  const [enrollments, setEnrollments] = useState<(Enrollment & { course: Course })[]>([]);
  const [dailyQuests, setDailyQuests] = useState<DailyQuest[]>([]);
  const [questCompletions, setQuestCompletions] = useState<QuestCompletion[]>([]);
  const [userBadges, setUserBadges] = useState<(UserBadge & { badge: Badge })[]>([]);
  const [streak, setStreak] = useState<Streak | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!childProfile) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch enrollments with courses
        const { data: enrollmentsData } = await supabase
          .from('enrollments')
          .select(`
            *,
            course:courses(*)
          `)
          .eq('child_id', childProfile.id);

        // Fetch daily quests for child's age group
        const { data: questsData } = await supabase
          .from('daily_quests')
          .select('*')
          .or(`age_group.eq.${childProfile.age ? 
            (childProfile.age <= 8 ? 'foundational' : 
             childProfile.age <= 12 ? 'growth' : 'purpose') : 'foundational'
          },age_group.is.null`)
          .eq('is_active', true);

        // Fetch quest completions for today
        const today = new Date().toISOString().split('T')[0];
        const { data: completionsData } = await supabase
          .from('quest_completions')
          .select('*')
          .eq('child_id', childProfile.id)
          .gte('completed_at', today);

        // Fetch user badges with badge details
        const { data: badgesData } = await supabase
          .from('user_badges')
          .select(`
            *,
            badge:badges(*)
          `)
          .eq('child_id', childProfile.id)
          .order('earned_at', { ascending: false })
          .limit(4);

        // Fetch or create streak
        const { data: streakData } = await supabase
          .from('streaks')
          .select('*')
          .eq('child_id', childProfile.id)
          .maybeSingle();

        setEnrollments(enrollmentsData || []);
        setDailyQuests(questsData || []);
        setQuestCompletions(completionsData || []);
        setUserBadges(badgesData || []);
        setStreak(streakData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [childProfile]);

  return {
    enrollments,
    dailyQuests,
    questCompletions,
    userBadges,
    streak,
    loading
  };
};