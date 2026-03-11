-- Run this script in your Supabase SQL Editor to create the leads table
-- This will store the email addresses collected from the subscription popup

CREATE TABLE IF NOT EXISTS public.leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Turn on Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert a new lead (so anonymous visitors can subscribe)
CREATE POLICY "Anyone can insert a lead" 
  ON public.leads 
  FOR INSERT 
  WITH CHECK (true);

-- Only admins can view the leads
CREATE POLICY "Admins can view leads" 
  ON public.leads 
  FOR SELECT 
  USING ( public.is_admin() );
