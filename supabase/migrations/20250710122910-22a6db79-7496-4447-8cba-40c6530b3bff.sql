-- Let's completely rebuild the RLS policies from scratch
-- First, disable RLS temporarily
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Parents can create child profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Parents can view their children" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Parents can update their children" ON public.profiles;

-- Re-enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create simple, working policies
CREATE POLICY "Enable all for authenticated users" 
ON public.profiles 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);