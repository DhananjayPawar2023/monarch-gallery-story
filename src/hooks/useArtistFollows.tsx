import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useArtistFollows = (userId?: string) => {
  return useQuery({
    queryKey: ["artist-follows", userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from("artist_follows")
        .select("*")
        .eq("user_id", userId);

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
};

export const useIsFollowing = (userId?: string, artistId?: string) => {
  return useQuery({
    queryKey: ["is-following", userId, artistId],
    queryFn: async () => {
      if (!userId || !artistId) return false;
      const { data, error } = await supabase
        .from("artist_follows")
        .select("id")
        .eq("user_id", userId)
        .eq("artist_id", artistId)
        .maybeSingle();

      if (error && error.code !== "PGRST116") throw error;
      return !!data;
    },
    enabled: !!userId && !!artistId,
  });
};

export const useToggleFollow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, artistId, isFollowing }: { userId: string; artistId: string; isFollowing: boolean }) => {
      if (isFollowing) {
        const { error } = await supabase
          .from("artist_follows")
          .delete()
          .eq("user_id", userId)
          .eq("artist_id", artistId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("artist_follows")
          .insert({ user_id: userId, artist_id: artistId });

        if (error) throw error;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["artist-follows"] });
      queryClient.invalidateQueries({ queryKey: ["is-following", variables.userId, variables.artistId] });
      toast.success(variables.isFollowing ? "Unfollowed artist" : "Following artist");
    },
    onError: () => {
      toast.error("Failed to update follow status");
    },
  });
};