import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useRecommendations = (userId?: string) => {
  return useQuery({
    queryKey: ["recommendations", userId],
    queryFn: async () => {
      if (!userId) return [];
      
      // Get user's favorites and views to generate recommendations
      const { data: favorites } = await supabase
        .from("favorites")
        .select("artwork_id")
        .eq("user_id", userId);

      const { data: views } = await supabase
        .from("artwork_views")
        .select("artwork_id")
        .eq("user_id", userId);

      const favoriteIds = favorites?.map(f => f.artwork_id) || [];
      const viewedIds = views?.map(v => v.artwork_id) || [];
      
      // Get artworks user has interacted with
      const interactedArtworkIds = [...new Set([...favoriteIds, ...viewedIds])];
      
      if (interactedArtworkIds.length === 0) {
        // Return featured artworks if no interaction history
        const { data, error } = await supabase
          .from("artworks")
          .select("*")
          .eq("featured", true)
          .limit(6);

        if (error) throw error;
        return data;
      }

      // Get artist IDs from interacted artworks
      const { data: interactedArtworks } = await supabase
        .from("artworks")
        .select("artist_id, medium")
        .in("id", interactedArtworkIds);

      const artistIds = interactedArtworks?.map(a => a.artist_id) || [];
      const mediums = interactedArtworks?.map(a => a.medium) || [];

      // Find similar artworks from same artists or mediums
      const { data, error } = await supabase
        .from("artworks")
        .select("*")
        .or(`artist_id.in.(${artistIds.join(",")}),medium.in.(${mediums.join(",")})`)
        .not("id", "in", `(${interactedArtworkIds.join(",")})`)
        .limit(6);

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
};