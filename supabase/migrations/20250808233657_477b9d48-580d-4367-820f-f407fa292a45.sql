-- Create enums for better type safety
CREATE TYPE skill_state AS ENUM ('locked', 'unlocked', 'completed', 'mastered');
CREATE TYPE exercise_type AS ENUM ('multiple_choice_audio', 'picture_choice', 'true_false', 'fill_blank', 'reorder_words', 'speak_prompt', 'scenario_response', 'match_image_text');
CREATE TYPE review_type AS ENUM ('skill_practice', 'unit_review', 'spaced_repetition', 'remedial');

-- Units table (groups of skills within courses)
CREATE TABLE units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  unlock_requirements JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Skills table (individual skill bubbles)
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id UUID NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT NOT NULL DEFAULT 'heart',
  order_index INTEGER NOT NULL,
  max_crown_level INTEGER NOT NULL DEFAULT 5,
  xp_per_crown INTEGER NOT NULL DEFAULT 100,
  prerequisite_skills UUID[], -- Array of skill IDs
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Exercises table (individual practice items)
CREATE TABLE exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
  exercise_type exercise_type NOT NULL,
  crown_level INTEGER NOT NULL DEFAULT 1,
  prompt_text TEXT NOT NULL,
  image_desc TEXT,
  audio_transcript TEXT,
  options JSONB DEFAULT '[]',
  correct_answer TEXT NOT NULL,
  hint_text TEXT,
  feedback_correct TEXT NOT NULL,
  feedback_incorrect TEXT NOT NULL,
  xp_reward INTEGER NOT NULL DEFAULT 10,
  difficulty_score DECIMAL(3,2) DEFAULT 1.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- User skill progress (crown levels and XP)
CREATE TABLE user_skill_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL,
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  crown_level INTEGER NOT NULL DEFAULT 0,
  total_xp INTEGER NOT NULL DEFAULT 0,
  current_streak INTEGER NOT NULL DEFAULT 0,
  best_streak INTEGER NOT NULL DEFAULT 0,
  last_practice_date DATE,
  state skill_state NOT NULL DEFAULT 'locked',
  mastery_score DECIMAL(3,2) DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(child_id, skill_id)
);

-- User exercise history (detailed practice records)
CREATE TABLE user_exercise_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL,
  exercise_id UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  session_id UUID,
  correct BOOLEAN NOT NULL,
  response TEXT,
  time_taken_seconds INTEGER,
  hints_used INTEGER DEFAULT 0,
  attempts INTEGER DEFAULT 1,
  xp_awarded INTEGER NOT NULL DEFAULT 0,
  difficulty_at_time DECIMAL(3,2) DEFAULT 1.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Review queue (spaced repetition scheduler)
CREATE TABLE review_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL,
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  unit_id UUID REFERENCES units(id) ON DELETE CASCADE,
  review_type review_type NOT NULL,
  due_date DATE NOT NULL,
  ease_factor DECIMAL(3,2) NOT NULL DEFAULT 2.5,
  repetition_count INTEGER NOT NULL DEFAULT 0,
  interval_days INTEGER NOT NULL DEFAULT 1,
  priority INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  next_review_date DATE
);

-- Checkpoints table (milestone achievements)
CREATE TABLE checkpoints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id UUID NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  checkpoint_type TEXT NOT NULL DEFAULT 'castle',
  unlock_requirements JSONB NOT NULL DEFAULT '{}',
  rewards JSONB DEFAULT '[]',
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- User checkpoint progress
CREATE TABLE user_checkpoint_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL,
  checkpoint_id UUID NOT NULL REFERENCES checkpoints(id) ON DELETE CASCADE,
  unlocked BOOLEAN NOT NULL DEFAULT false,
  completed BOOLEAN NOT NULL DEFAULT false,
  unlocked_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(child_id, checkpoint_id)
);

-- Enable RLS on all new tables
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skill_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_exercise_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_checkpoint_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public read access on course content
CREATE POLICY "Anyone can view units" ON units FOR SELECT USING (true);
CREATE POLICY "Anyone can view skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Anyone can view exercises" ON exercises FOR SELECT USING (true);
CREATE POLICY "Anyone can view checkpoints" ON checkpoints FOR SELECT USING (true);

-- RLS Policies for user-specific data
CREATE POLICY "Users can manage their skill progress" ON user_skill_progress
FOR ALL USING (
  child_id IN (
    SELECT id FROM profiles 
    WHERE user_id = auth.uid() OR parent_id IN (
      SELECT id FROM profiles WHERE user_id = auth.uid()
    )
  )
);

CREATE POLICY "Users can view their exercise history" ON user_exercise_history
FOR ALL USING (
  child_id IN (
    SELECT id FROM profiles 
    WHERE user_id = auth.uid() OR parent_id IN (
      SELECT id FROM profiles WHERE user_id = auth.uid()
    )
  )
);

CREATE POLICY "Users can manage their review queue" ON review_queue
FOR ALL USING (
  child_id IN (
    SELECT id FROM profiles 
    WHERE user_id = auth.uid() OR parent_id IN (
      SELECT id FROM profiles WHERE user_id = auth.uid()
    )
  )
);

CREATE POLICY "Users can manage their checkpoint progress" ON user_checkpoint_progress
FOR ALL USING (
  child_id IN (
    SELECT id FROM profiles 
    WHERE user_id = auth.uid() OR parent_id IN (
      SELECT id FROM profiles WHERE user_id = auth.uid()
    )
  )
);

-- Indexes for performance
CREATE INDEX idx_skills_unit_id ON skills(unit_id);
CREATE INDEX idx_exercises_skill_id ON exercises(skill_id);
CREATE INDEX idx_user_skill_progress_child_skill ON user_skill_progress(child_id, skill_id);
CREATE INDEX idx_user_exercise_history_child_skill ON user_exercise_history(child_id, skill_id, created_at);
CREATE INDEX idx_review_queue_child_due ON review_queue(child_id, due_date) WHERE completed_at IS NULL;
CREATE INDEX idx_review_queue_due_date ON review_queue(due_date) WHERE completed_at IS NULL;

-- Functions for spaced repetition
CREATE OR REPLACE FUNCTION calculate_next_review_interval(
  current_interval INTEGER,
  ease_factor DECIMAL,
  performance_quality INTEGER -- 0=incorrect, 1=correct
) RETURNS TABLE(next_interval INTEGER, new_ease_factor DECIMAL) AS $$
BEGIN
  IF performance_quality = 0 THEN
    -- Incorrect answer: reset to beginning
    RETURN QUERY SELECT 1 as next_interval, GREATEST(1.3, ease_factor - 0.15) as new_ease_factor;
  ELSE
    -- Correct answer: apply spaced repetition
    RETURN QUERY SELECT 
      CASE 
        WHEN current_interval = 1 THEN 3
        WHEN current_interval <= 3 THEN 7
        WHEN current_interval <= 7 THEN 14
        WHEN current_interval <= 14 THEN 30
        ELSE LEAST(90, ROUND(current_interval * ease_factor)::INTEGER)
      END as next_interval,
      LEAST(4.0, ease_factor + 0.15) as new_ease_factor;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to schedule skill review
CREATE OR REPLACE FUNCTION schedule_skill_review(
  p_child_id UUID,
  p_skill_id UUID,
  p_performance_quality INTEGER
) RETURNS VOID AS $$
DECLARE
  current_review RECORD;
  next_interval INTEGER;
  new_ease_factor DECIMAL;
BEGIN
  -- Get current review record or create defaults
  SELECT * INTO current_review
  FROM review_queue 
  WHERE child_id = p_child_id 
    AND skill_id = p_skill_id 
    AND review_type = 'spaced_repetition'
    AND completed_at IS NULL
  ORDER BY created_at DESC
  LIMIT 1;

  -- Calculate next interval and ease factor
  SELECT * INTO next_interval, new_ease_factor
  FROM calculate_next_review_interval(
    COALESCE(current_review.interval_days, 1),
    COALESCE(current_review.ease_factor, 2.5),
    p_performance_quality
  );

  -- Mark current review as completed if exists
  IF current_review.id IS NOT NULL THEN
    UPDATE review_queue 
    SET completed_at = now(),
        next_review_date = CURRENT_DATE + next_interval
    WHERE id = current_review.id;
  END IF;

  -- Schedule next review
  INSERT INTO review_queue (
    child_id, skill_id, review_type, due_date, 
    ease_factor, repetition_count, interval_days, priority
  ) VALUES (
    p_child_id, p_skill_id, 'spaced_repetition', 
    CURRENT_DATE + next_interval,
    new_ease_factor,
    COALESCE(current_review.repetition_count, 0) + 1,
    next_interval,
    CASE WHEN p_performance_quality = 0 THEN 3 ELSE 1 END -- Higher priority for incorrect answers
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to schedule unit reviews after crown level up
CREATE OR REPLACE FUNCTION schedule_unit_review_after_crown(
  p_child_id UUID,
  p_skill_id UUID
) RETURNS VOID AS $$
DECLARE
  skill_unit_id UUID;
  review_delay INTEGER;
BEGIN
  -- Get the unit for this skill
  SELECT unit_id INTO skill_unit_id
  FROM skills 
  WHERE id = p_skill_id;

  -- Random delay between 48-72 hours
  review_delay := 2 + ROUND(RANDOM())::INTEGER;

  -- Schedule unit review
  INSERT INTO review_queue (
    child_id, skill_id, unit_id, review_type, 
    due_date, ease_factor, repetition_count, interval_days, priority
  ) VALUES (
    p_child_id, p_skill_id, skill_unit_id, 'unit_review',
    CURRENT_DATE + review_delay,
    2.5, 0, review_delay, 2
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers for automatic updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_units_updated_at BEFORE UPDATE ON units
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_skill_progress_updated_at BEFORE UPDATE ON user_skill_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();