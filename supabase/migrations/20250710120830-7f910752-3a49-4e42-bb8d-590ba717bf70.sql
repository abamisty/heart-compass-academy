-- Drop all existing policies that might cause recursion
DROP POLICY IF EXISTS "Parents can view their children" ON public.profiles;
DROP POLICY IF EXISTS "Parents can update their children" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Create security definer functions to avoid recursion
CREATE OR REPLACE FUNCTION public.is_user_parent_of_profile(profile_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = profile_id 
    AND parent_id = public.get_user_profile_id(auth.uid())
  );
$$;

CREATE OR REPLACE FUNCTION public.is_user_own_profile(profile_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT profile_user_id = auth.uid();
$$;

-- Recreate policies using security definer functions
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (public.is_user_own_profile(user_id));

CREATE POLICY "Parents can view their children" 
ON public.profiles 
FOR SELECT 
USING (public.is_user_parent_of_profile(id));

CREATE POLICY "Users can update own profile" 
ON public.profiles 
FOR UPDATE 
USING (public.is_user_own_profile(user_id));

CREATE POLICY "Parents can update their children" 
ON public.profiles 
FOR UPDATE 
USING (public.is_user_parent_of_profile(id));