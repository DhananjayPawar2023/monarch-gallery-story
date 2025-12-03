-- Fix profiles: Restrict SELECT to authenticated users only
DROP POLICY IF EXISTS "Anyone can view profiles" ON public.profiles;

CREATE POLICY "Authenticated users can view profiles" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Fix artwork_views: Restrict SELECT to admins or own views only
DROP POLICY IF EXISTS "Anyone can view artwork views" ON public.artwork_views;

CREATE POLICY "Users can view their own artwork views" 
ON public.artwork_views 
FOR SELECT 
USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'));

-- Fix social_shares: Restrict writes to authenticated users
DROP POLICY IF EXISTS "Anyone can increment share count" ON public.social_shares;
DROP POLICY IF EXISTS "Anyone can update share count" ON public.social_shares;

CREATE POLICY "Authenticated users can insert share counts" 
ON public.social_shares 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update share counts" 
ON public.social_shares 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

-- Fix artwork_recommendations: Prevent user manipulation (system-only inserts via service role)
DROP POLICY IF EXISTS "System can insert recommendations" ON public.artwork_recommendations;

CREATE POLICY "Only admins can manage recommendations" 
ON public.artwork_recommendations 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete recommendations" 
ON public.artwork_recommendations 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'));