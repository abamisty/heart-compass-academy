-- Create user roles enum
CREATE TYPE public.user_role AS ENUM ('parent', 'child');

-- Create age groups enum  
CREATE TYPE public.age_group AS ENUM ('foundational', 'growth', 'purpose');

-- Create profiles table for both parents and children
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'parent',
  age INTEGER,
  avatar_url TEXT,
  parent_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create courses table
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  age_group age_group NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'Beginner',
  duration_weeks INTEGER NOT NULL DEFAULT 4,
  total_lessons INTEGER NOT NULL DEFAULT 10,
  image_url TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create lessons table
CREATE TABLE public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  heart_gems_reward INTEGER NOT NULL DEFAULT 25,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create enrollments table
CREATE TABLE public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  enrolled_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  progress_percentage INTEGER NOT NULL DEFAULT 0,
  current_lesson_id UUID REFERENCES public.lessons(id),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(child_id, course_id)
);

-- Create progress tracking table
CREATE TABLE public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ,
  heart_gems_earned INTEGER NOT NULL DEFAULT 0,
  quiz_score INTEGER,
  reflection_text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(child_id, lesson_id)
);

-- Create badges table
CREATE TABLE public.badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT '#3B82F6',
  criteria JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user badges table
CREATE TABLE public.user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE NOT NULL,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(child_id, badge_id)
);

-- Create daily quests table
CREATE TABLE public.daily_quests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  quest_type TEXT NOT NULL,
  heart_gems_reward INTEGER NOT NULL DEFAULT 15,
  icon TEXT NOT NULL,
  age_group age_group,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create quest completions table
CREATE TABLE public.quest_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  quest_id UUID REFERENCES public.daily_quests(id) ON DELETE CASCADE NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  notes TEXT,
  UNIQUE(child_id, quest_id, DATE(completed_at))
);

-- Create streaks table
CREATE TABLE public.streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_activity_date DATE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(child_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quest_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.streaks ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Profiles: Users can view their own profile and children can be viewed by their parents
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Parents can view their children" ON public.profiles
  FOR SELECT USING (parent_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Parents can update their children" ON public.profiles
  FOR UPDATE USING (parent_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Parents can create child profiles" ON public.profiles
  FOR INSERT WITH CHECK (parent_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()) OR user_id = auth.uid());

-- Courses: Everyone can view courses
CREATE POLICY "Anyone can view courses" ON public.courses FOR SELECT USING (true);

-- Lessons: Everyone can view lessons
CREATE POLICY "Anyone can view lessons" ON public.lessons FOR SELECT USING (true);

-- Enrollments: Users can view their own enrollments or their children's
CREATE POLICY "View own enrollments" ON public.enrollments
  FOR SELECT USING (
    child_id IN (
      SELECT id FROM public.profiles 
      WHERE user_id = auth.uid() OR parent_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Manage own enrollments" ON public.enrollments
  FOR ALL USING (
    child_id IN (
      SELECT id FROM public.profiles 
      WHERE user_id = auth.uid() OR parent_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
    )
  );

-- Progress: Similar pattern for all child-related tables
CREATE POLICY "View own progress" ON public.lesson_progress
  FOR ALL USING (
    child_id IN (
      SELECT id FROM public.profiles 
      WHERE user_id = auth.uid() OR parent_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "View own badges" ON public.user_badges
  FOR ALL USING (
    child_id IN (
      SELECT id FROM public.profiles 
      WHERE user_id = auth.uid() OR parent_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "View own quests" ON public.quest_completions
  FOR ALL USING (
    child_id IN (
      SELECT id FROM public.profiles 
      WHERE user_id = auth.uid() OR parent_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "View own streaks" ON public.streaks
  FOR ALL USING (
    child_id IN (
      SELECT id FROM public.profiles 
      WHERE user_id = auth.uid() OR parent_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
    )
  );

-- Public read access for badges and daily quests
CREATE POLICY "Anyone can view badges" ON public.badges FOR SELECT USING (true);
CREATE POLICY "Anyone can view daily quests" ON public.daily_quests FOR SELECT USING (true);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, first_name, last_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    'parent'
  );
  RETURN NEW;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Add update triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_enrollments_updated_at
  BEFORE UPDATE ON public.enrollments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
-- Sample courses
INSERT INTO public.courses (title, description, age_group, difficulty, duration_weeks, total_lessons, is_featured) VALUES
('Character Values Foundations', 'Learn core values like respect, empathy, responsibility, and honesty through engaging activities and stories.', 'foundational', 'Beginner', 6, 12, true),
('Life Skills Mastery', 'Develop essential life skills including emotional intelligence, communication, and decision-making abilities.', 'foundational', 'Beginner', 4, 8, true),
('Public Speaking Confidence', 'Build confidence in expressing ideas and opinions through structured practice and feedback.', 'growth', 'Intermediate', 8, 16, true),
('Financial Literacy & Sales Skills', 'Learn money management, budgeting, and ethical sales techniques for teens.', 'growth', 'Intermediate', 10, 20, false),
('Leadership & Purpose Discovery', 'Explore personal mission, build leadership habits, and discover your life purpose.', 'purpose', 'Advanced', 12, 24, true),
('Digital Citizenship', 'Navigate online relationships and digital responsibility in the modern world.', 'growth', 'Beginner', 4, 8, false);

-- Sample lessons for first course
INSERT INTO public.lessons (course_id, title, description, order_index, content, heart_gems_reward) VALUES
((SELECT id FROM public.courses WHERE title = 'Character Values Foundations'), 'Understanding Emotions', 'Learn to identify and understand different emotions in yourself and others.', 1, '{"video_url": "", "quiz": {"question": "What is empathy?", "options": ["Feeling sorry for someone", "Understanding and sharing others feelings", "Ignoring others emotions", "Being emotional"], "correct": 1}, "reflection_prompt": "Think of a time when someone showed empathy to you. How did it make you feel?"}', 25),
((SELECT id FROM public.courses WHERE title = 'Character Values Foundations'), 'Showing Respect', 'Discover different ways to show respect to family, friends, and community members.', 2, '{"video_url": "", "quiz": {"question": "Respect means:", "options": ["Only listening to adults", "Treating others how you want to be treated", "Always agreeing with everyone", "Being quiet all the time"], "correct": 1}, "reflection_prompt": "How can you show more respect to someone in your life this week?"}', 25),
((SELECT id FROM public.courses WHERE title = 'Character Values Foundations'), 'Building Empathy', 'Learn to step into others shoes and understand different perspectives.', 3, '{"video_url": "", "quiz": {"question": "When your friend seems upset, what is the best first step?", "options": ["Tell them they should not feel that way", "Ask them how they are feeling and listen", "Change the subject to something fun", "Give them advice right away"], "correct": 1}, "reflection_prompt": "Can you think of a time when someone showed empathy to you?"}', 25);

-- Sample badges
INSERT INTO public.badges (name, description, icon, color) VALUES
('Empathy Explorer', 'Completed lessons on understanding others feelings', '❤️', '#EF4444'),
('Respect Ranger', 'Demonstrated respect in multiple activities', '⭐', '#F59E0B'),
('Honest Helper', 'Showed honesty and integrity in challenges', '🏆', '#3B82F6'),
('Kindness Champion', 'Completed multiple acts of kindness', '✨', '#8B5CF6'),
('Learning Streak Master', 'Maintained a 7-day learning streak', '🔥', '#F97316'),
('First Steps', 'Completed your first lesson', '👶', '#10B981');

-- Sample daily quests
INSERT INTO public.daily_quests (title, description, quest_type, heart_gems_reward, icon, age_group) VALUES
('Practice Gratitude', 'Write down 3 things you are grateful for today', 'reflection', 15, '❤️', null),
('Kindness Challenge', 'Do one kind act for a family member', 'action', 20, '✨', null),
('Learning Streak', 'Complete todays lesson', 'lesson', 25, '📚', null),
('Emotion Check-in', 'Share how you are feeling with someone you trust', 'reflection', 15, '💭', 'foundational'),
('Help at Home', 'Help with a household chore without being asked', 'action', 20, '🏠', null),
('Compliment Someone', 'Give a genuine compliment to someone today', 'action', 15, '💫', null);