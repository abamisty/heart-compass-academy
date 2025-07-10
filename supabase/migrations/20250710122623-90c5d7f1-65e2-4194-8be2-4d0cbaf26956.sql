-- Let's check the current INSERT policy and fix it
DROP POLICY IF EXISTS "Parents can create child profiles" ON public.profiles;

-- Create a simpler, more reliable INSERT policy
CREATE POLICY "Parents can create child profiles" 
ON public.profiles 
FOR INSERT 
WITH CHECK (
  -- Allow if the user_id matches the authenticated user (for their own profile)
  (user_id = auth.uid()) OR 
  -- Allow if parent_id exists and belongs to the authenticated user
  (parent_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = NEW.parent_id 
    AND user_id = auth.uid()
    AND role = 'parent'
  ))
);