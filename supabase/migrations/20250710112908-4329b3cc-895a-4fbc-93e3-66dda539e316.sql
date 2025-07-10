-- Add PIN field to profiles table for child authentication
ALTER TABLE public.profiles 
ADD COLUMN pin TEXT;

-- Add a check constraint to ensure PIN is only 4-6 digits for children
ALTER TABLE public.profiles 
ADD CONSTRAINT pin_format_check 
CHECK (
  (role = 'child' AND pin IS NOT NULL AND pin ~ '^[0-9]{4,6}$') OR 
  (role = 'parent' AND pin IS NULL)
);

-- Create index for faster PIN lookups
CREATE INDEX idx_profiles_pin ON public.profiles(pin) WHERE pin IS NOT NULL;