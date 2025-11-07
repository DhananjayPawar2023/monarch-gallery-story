import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useFavorites = (userId?: string) => {
  return useQuery({
    queryKey: ["favorites", userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from("favorites")
        .select("*, artworks(*)")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
};

export const useIsFavorite = (userId?: string, artworkId?: string) => {
  return useQuery({
    queryKey: ["favorite", userId, artworkId],
    queryFn: async () => {
      if (!userId || !artworkId) return false;
      const { data, error } = await supabase
        .from("favorites")
        .select("id")
        .eq("user_id", userId)
        .eq("artwork_id", artworkId)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      return !!data;
    },
    enabled: !!userId && !!artworkId,
  });
};

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, artworkId, isFavorite }: { userId: string; artworkId: string; isFavorite: boolean }) => {
      if (isFavorite) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", userId)
          .eq("artwork_id", artworkId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("favorites")
          .insert({ user_id: userId, artwork_id: artworkId });

        if (error) throw error;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["favorite", variables.userId, variables.artworkId] });
      toast.success(variables.isFavorite ? "Removed from favorites" : "Added to favorites");
    },
    onError: () => {
      toast.error("Failed to update favorites");
    },
  });
};
