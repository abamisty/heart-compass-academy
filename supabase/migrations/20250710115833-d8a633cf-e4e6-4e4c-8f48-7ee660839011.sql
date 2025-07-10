-- Drop the problematic INSERT policy
DROP POLICY IF EXISTS "Parents can create child profiles" ON public.profiles;

-- Create a security definer function to check if user is a parent
CREATE OR REPLACE FUNCTION public.get_user_profile_id(user_uuid uuid)
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT id FROM public.profiles WHERE user_id = user_uuid LIMIT 1;
$$;

-- Create a new INSERT policy that uses the security definer function
CREATE POLICY "Parents can create child profiles" 
ON public.profiles 
FOR INSERT 
WITH CHECK (
  (parent_id = public.get_user_profile_id(auth.uid())) OR 
  (user_id = auth.uid())
);