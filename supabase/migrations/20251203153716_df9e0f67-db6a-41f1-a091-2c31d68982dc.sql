-- Create user_roles table for proper admin management
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Users can only read their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

-- Only admins can manage roles (bootstrap admin manually)
CREATE POLICY "Admins can manage roles"
ON public.user_roles FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Create SECURITY DEFINER function to check roles (bypasses RLS for internal checks)
CREATE OR REPLACE FUNCTION public.has_role(check_user_id UUID, check_role TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = check_user_id AND role = check_role
  );
END;
$$;

-- Drop old permissive INSERT policies on content tables
DROP POLICY IF EXISTS "Authenticated users can insert artists" ON public.artists;
DROP POLICY IF EXISTS "Authenticated users can insert artworks" ON public.artworks;
DROP POLICY IF EXISTS "Authenticated users can insert collections" ON public.collections;
DROP POLICY IF EXISTS "Authenticated users can insert exhibitions" ON public.exhibitions;
DROP POLICY IF EXISTS "Authenticated users can insert journal entries" ON public.journal_entries;
DROP POLICY IF EXISTS "Authenticated users can insert collectors" ON public.collectors;
DROP POLICY IF EXISTS "Authenticated users can insert interviews" ON public.artist_interviews;

-- Create admin-only INSERT policies
CREATE POLICY "Only admins can insert artists"
ON public.artists FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can insert artworks"
ON public.artworks FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can insert collections"
ON public.collections FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can insert exhibitions"
ON public.exhibitions FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can insert journal entries"
ON public.journal_entries FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can insert collectors"
ON public.collectors FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can insert interviews"
ON public.artist_interviews FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));