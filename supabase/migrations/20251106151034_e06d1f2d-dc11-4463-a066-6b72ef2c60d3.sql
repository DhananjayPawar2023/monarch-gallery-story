-- Create artist interviews table
CREATE TABLE public.artist_interviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  artist_id UUID NOT NULL REFERENCES public.artists(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  interview_date DATE NOT NULL DEFAULT CURRENT_DATE,
  cover_image_url TEXT,
  video_url TEXT,
  audio_url TEXT,
  audio_title TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'draft',
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create collectors table
CREATE TABLE public.collectors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  bio TEXT NOT NULL,
  location TEXT,
  image_url TEXT NOT NULL,
  collection_focus TEXT,
  website TEXT,
  instagram TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create exhibitions table
CREATE TABLE public.exhibitions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  curator_statement TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  cover_image_url TEXT,
  status TEXT NOT NULL DEFAULT 'past',
  featured BOOLEAN NOT NULL DEFAULT false,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create exhibition artworks junction table
CREATE TABLE public.exhibition_artworks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  exhibition_id UUID NOT NULL REFERENCES public.exhibitions(id) ON DELETE CASCADE,
  artwork_id UUID NOT NULL REFERENCES public.artworks(id) ON DELETE CASCADE,
  display_order INTEGER,
  UNIQUE(exhibition_id, artwork_id)
);

-- Create newsletter subscribers table
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'active',
  preferences JSONB DEFAULT '{}'::jsonb
);

-- Enable RLS
ALTER TABLE public.artist_interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exhibitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exhibition_artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for artist_interviews
CREATE POLICY "Anyone can view published interviews"
ON public.artist_interviews FOR SELECT
USING (status = 'published');

CREATE POLICY "Admins can view all interviews"
ON public.artist_interviews FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert interviews"
ON public.artist_interviews FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update interviews"
ON public.artist_interviews FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete interviews"
ON public.artist_interviews FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for collectors
CREATE POLICY "Anyone can view featured collectors"
ON public.collectors FOR SELECT
USING (featured = true);

CREATE POLICY "Admins can view all collectors"
ON public.collectors FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert collectors"
ON public.collectors FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update collectors"
ON public.collectors FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete collectors"
ON public.collectors FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for exhibitions
CREATE POLICY "Anyone can view exhibitions"
ON public.exhibitions FOR SELECT
USING (true);

CREATE POLICY "Admins can insert exhibitions"
ON public.exhibitions FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update exhibitions"
ON public.exhibitions FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete exhibitions"
ON public.exhibitions FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for exhibition_artworks
CREATE POLICY "Anyone can view exhibition artworks"
ON public.exhibition_artworks FOR SELECT
USING (true);

CREATE POLICY "Admins can manage exhibition artworks"
ON public.exhibition_artworks FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for newsletter_subscribers
CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscribers FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view all subscribers"
ON public.newsletter_subscribers FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update subscribers"
ON public.newsletter_subscribers FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create triggers for updated_at
CREATE TRIGGER update_artist_interviews_updated_at
BEFORE UPDATE ON public.artist_interviews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_collectors_updated_at
BEFORE UPDATE ON public.collectors
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_exhibitions_updated_at
BEFORE UPDATE ON public.exhibitions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();