-- Create storage bucket for artwork images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('artworks', 'artworks', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for artist images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('artists', 'artists', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for artwork images
CREATE POLICY "Artwork images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'artworks');

CREATE POLICY "Admins can upload artwork images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'artworks' 
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Admins can update artwork images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'artworks' 
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Admins can delete artwork images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'artworks' 
  AND auth.uid() IS NOT NULL
);

-- Create storage policies for artist images
CREATE POLICY "Artist images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'artists');

CREATE POLICY "Admins can upload artist images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'artists' 
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Admins can update artist images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'artists' 
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Admins can delete artist images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'artists' 
  AND auth.uid() IS NOT NULL
);

-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

-- Create artists table
CREATE TABLE public.artists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text,
  short_bio text,
  bio text NOT NULL,
  specialization text,
  image_url text NOT NULL,
  cover_image_url text,
  quote text,
  website text,
  instagram text,
  twitter text,
  audio_url text,
  audio_title text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) NOT NULL
);

ALTER TABLE public.artists ENABLE ROW LEVEL SECURITY;

-- Artists RLS policies
CREATE POLICY "Anyone can view artists"
ON public.artists FOR SELECT
USING (true);

CREATE POLICY "Admins can insert artists"
ON public.artists FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update artists"
ON public.artists FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete artists"
ON public.artists FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Create collections table
CREATE TABLE public.collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  curator_statement text NOT NULL,
  cover_image_url text,
  release_date date NOT NULL,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  audio_url text,
  audio_title text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) NOT NULL
);

ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;

-- Collections RLS policies
CREATE POLICY "Anyone can view published collections"
ON public.collections FOR SELECT
USING (status = 'published');

CREATE POLICY "Admins can view all collections"
ON public.collections FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert collections"
ON public.collections FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update collections"
ON public.collections FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete collections"
ON public.collections FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Create artworks table
CREATE TABLE public.artworks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  artist_id uuid REFERENCES public.artists(id) ON DELETE CASCADE NOT NULL,
  collection_id uuid REFERENCES public.collections(id) ON DELETE SET NULL,
  description text NOT NULL,
  story text NOT NULL,
  medium text NOT NULL,
  year integer NOT NULL,
  dimensions text,
  edition text NOT NULL,
  price text,
  image_url text NOT NULL,
  video_url text,
  audio_url text,
  audio_title text,
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) NOT NULL
);

ALTER TABLE public.artworks ENABLE ROW LEVEL SECURITY;

-- Artworks RLS policies
CREATE POLICY "Anyone can view artworks"
ON public.artworks FOR SELECT
USING (true);

CREATE POLICY "Admins can insert artworks"
ON public.artworks FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update artworks"
ON public.artworks FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete artworks"
ON public.artworks FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_artists_updated_at
BEFORE UPDATE ON public.artists
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_collections_updated_at
BEFORE UPDATE ON public.collections
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_artworks_updated_at
BEFORE UPDATE ON public.artworks
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();