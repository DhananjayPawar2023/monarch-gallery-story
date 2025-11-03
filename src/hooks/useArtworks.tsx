import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Artwork {
  id: string;
  title: string;
  artist_id: string;
  description: string;
  story: string;
  image_url: string;
  medium: string;
  year: number;
  edition: string;
  price?: string;
  featured: boolean;
  audio_url?: string;
  audio_title?: string;
  video_url?: string;
  collection_id?: string;
}

export function useArtworks() {
  return useQuery({
    queryKey: ["artworks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("artworks")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Artwork[];
    },
  });
}

export function useArtwork(id: string) {
  return useQuery({
    queryKey: ["artwork", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("artworks")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Artwork;
    },
    enabled: !!id,
  });
}

export function useUpdateArtwork() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Artwork> }) => {
      const { data, error } = await supabase
        .from("artworks")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artworks"] });
    },
  });
}

export function useDeleteArtwork() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("artworks")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artworks"] });
    },
  });
}
