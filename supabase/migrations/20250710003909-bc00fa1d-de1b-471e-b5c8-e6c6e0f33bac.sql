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