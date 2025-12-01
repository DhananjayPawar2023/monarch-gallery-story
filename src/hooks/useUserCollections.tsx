import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useUserCollections = (userId?: string) => {
  return useQuery({
    queryKey: ["user-collections", userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from("user_collections")
        .select("*, collection_artworks(artwork_id)")
        .eq("user_id", userId);

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
};

export const useCreateUserCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, name, description, isPublic }: { userId: string; name: string; description?: string; isPublic?: boolean }) => {
      const { data, error } = await supabase
        .from("user_collections")
        .insert({
          user_id: userId,
          name,
          description,
          is_public: isPublic || false,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-collections"] });
      toast.success("Collection created successfully");
    },
    onError: () => {
      toast.error("Failed to create collection");
    },
  });
};

export const useAddToCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ collectionId, artworkId }: { collectionId: string; artworkId: string }) => {
      const { error } = await supabase
        .from("collection_artworks")
        .insert({ collection_id: collectionId, artwork_id: artworkId });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-collections"] });
      toast.success("Added to collection");
    },
    onError: () => {
      toast.error("Failed to add to collection");
    },
  });
};

export const useRemoveFromCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ collectionId, artworkId }: { collectionId: string; artworkId: string }) => {
      const { error } = await supabase
        .from("collection_artworks")
        .delete()
        .eq("collection_id", collectionId)
        .eq("artwork_id", artworkId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-collections"] });
      toast.success("Removed from collection");
    },
    onError: () => {
      toast.error("Failed to remove from collection");
    },
  });
};