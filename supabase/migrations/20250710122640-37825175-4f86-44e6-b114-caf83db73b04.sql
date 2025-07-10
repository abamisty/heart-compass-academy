-- Create a working INSERT policy without using NEW
CREATE POLICY "Parents can create child profiles" 
ON public.profiles 
FOR INSERT 
WITH CHECK (
  -- Allow if the user_id matches the authenticated user (for their own profile)
  (user_id = auth.uid()) OR 
  -- Allow if parent_id belongs to the authenticated user
  (parent_id IN (
    SELECT id FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'parent'
  ))
);