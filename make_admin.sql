-- Run this script in your Supabase SQL Editor to make yourself an admin.

UPDATE public.profiles
SET role = 'admin'
WHERE email = 'j.parganiha@gmail.com';

-- Verify the result
SELECT email, role FROM public.profiles WHERE email = 'j.parganiha@gmail.com';
