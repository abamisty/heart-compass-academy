-- Fix function search path security warnings by setting proper search_path
CREATE OR REPLACE FUNCTION public.calculate_next_review_interval(
  current_interval INTEGER,
  ease_factor DECIMAL,
  performance_quality INTEGER -- 0=incorrect, 1=correct
) RETURNS TABLE(next_interval INTEGER, new_ease_factor DECIMAL) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
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
$$;

-- Fix function search path security warnings
CREATE OR REPLACE FUNCTION public.schedule_skill_review(
  p_child_id UUID,
  p_skill_id UUID,
  p_performance_quality INTEGER
) RETURNS VOID 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = 'public'
AS $$
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
$$;

-- Fix function search path security warnings
CREATE OR REPLACE FUNCTION public.schedule_unit_review_after_crown(
  p_child_id UUID,
  p_skill_id UUID
) RETURNS VOID 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = 'public'
AS $$
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
$$;

-- Fix update function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;