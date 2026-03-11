-- Create a table for public profiles
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  full_name text,
  role text check (role in ('admin', 'user')) default 'user',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Create policies

-- Policy 1: Anyone can read their own profile
create policy "Users can view own profile" 
on public.profiles 
for select 
using ( auth.uid() = id );

-- Policy 2: Users can update their own profile
create policy "Users can update own profile" 
on public.profiles 
for update 
using ( auth.uid() = id );

-- Policy 3: Admins can read all profiles
create policy "Admins can view all profiles"
on public.profiles
for select
using (
  exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);

-- Policy 4: Admins can update all profiles
create policy "Admins can update all profiles"
on public.profiles
for update
using (
  exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);

-- Create a function to automatically create a profile when a new user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id, 
    new.email,
    new.raw_user_meta_data->>'full_name',
    coalesce(new.raw_user_meta_data->>'role', 'user')
  );
  return new;
end;
$$;

-- Create a trigger to call the function when a new user is inserted into auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create a basic programs/classes table since it's a fitness center
create table if not exists public.classes (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  instructor text,
  schedule jsonb,
  capacity integer default 20,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for classes
alter table public.classes enable row level security;

-- Anyone can view classes
create policy "Classes are viewable by everyone"
on public.classes
for select
using (true);

-- Only admins can insert/update/delete classes
create policy "Admins can insert classes"
on public.classes
for insert
with check (
  exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);

create policy "Admins can update classes"
on public.classes
for update
using (
  exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);

create policy "Admins can delete classes"
on public.classes
for delete
using (
  exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);
