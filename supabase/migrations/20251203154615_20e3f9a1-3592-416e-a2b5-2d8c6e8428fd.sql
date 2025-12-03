-- Fix exhibition_artworks: Drop existing policies and create admin-only write policies
DROP POLICY IF EXISTS "Authenticated users can manage exhibition artworks" ON public.exhibition_artworks;
DROP POLICY IF EXISTS "Anyone can view exhibition artworks" ON public.exhibition_artworks;
DROP POLICY IF EXISTS "Only admins can insert exhibition artworks" ON public.exhibition_artworks;
DROP POLICY IF EXISTS "Only admins can update exhibition artworks" ON public.exhibition_artworks;
DROP POLICY IF EXISTS "Only admins can delete exhibition artworks" ON public.exhibition_artworks;

CREATE POLICY "Anyone can view exhibition artworks" 
ON public.exhibition_artworks 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can insert exhibition artworks" 
ON public.exhibition_artworks 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update exhibition artworks" 
ON public.exhibition_artworks 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete exhibition artworks" 
ON public.exhibition_artworks 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'));

-- Fix nft_metadata: Drop existing policies and create admin-only write policies
DROP POLICY IF EXISTS "Authenticated users can manage nft metadata" ON public.nft_metadata;
DROP POLICY IF EXISTS "Anyone can view nft metadata" ON public.nft_metadata;
DROP POLICY IF EXISTS "Only admins can insert nft metadata" ON public.nft_metadata;
DROP POLICY IF EXISTS "Only admins can update nft metadata" ON public.nft_metadata;
DROP POLICY IF EXISTS "Only admins can delete nft metadata" ON public.nft_metadata;

CREATE POLICY "Anyone can view nft metadata" 
ON public.nft_metadata 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can insert nft metadata" 
ON public.nft_metadata 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update nft metadata" 
ON public.nft_metadata 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete nft metadata" 
ON public.nft_metadata 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'));

-- Fix newsletter_subscribers: Make SELECT admin-only
DROP POLICY IF EXISTS "Anyone can view their subscription" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admins can view newsletter subscribers" ON public.newsletter_subscribers;

CREATE POLICY "Admins can view newsletter subscribers" 
ON public.newsletter_subscribers 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'));