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