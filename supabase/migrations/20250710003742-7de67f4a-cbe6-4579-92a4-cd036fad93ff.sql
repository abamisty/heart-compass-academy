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

-- Public read access for badges and daily quests
CREATE POLICY "Anyone can view badges" ON public.badges FOR SELECT USING (true);
CREATE POLICY "Anyone can view daily quests" ON public.daily_quests FOR SELECT USING (true);