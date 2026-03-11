-- Fix for infinite recursion in RLS policies

-- 1. Create a security definer function to check if the current user is an admin.
-- 'security definer' allows the function to bypass RLS, preventing the infinite loop.
create or replace function public.is_admin()
returns boolean
language plpgsql
security definer set search_path = public
as $$
declare
  is_admin boolean;
begin
  select (role = 'admin') into is_admin
  from public.profiles
  where id = auth.uid();
  
  return coalesce(is_admin, false);
end;
$$;

-- 2. Drop the existing policies that caused the recursion
drop policy if exists "Admins can view all profiles" on public.profiles;
drop policy if exists "Admins can update all profiles" on public.profiles;

drop policy if exists "Admins can insert classes" on public.classes;
drop policy if exists "Admins can update classes" on public.classes;
drop policy if exists "Admins can delete classes" on public.classes;

-- 3. Recreate the policies using the new is_admin() function

-- Profiles table
create policy "Admins can view all profiles"
on public.profiles
for select
using ( public.is_admin() );

create policy "Admins can update all profiles"
on public.profiles
for update
using ( public.is_admin() );

-- Classes table
create policy "Admins can insert classes"
on public.classes
for insert
with check ( public.is_admin() );

create policy "Admins can update classes"
on public.classes
for update
using ( public.is_admin() );

create policy "Admins can delete classes"
on public.classes
for delete
using ( public.is_admin() );

-- 4. Now that policies are fixed, run the update query again
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'j.parganiha@gmail.com';
