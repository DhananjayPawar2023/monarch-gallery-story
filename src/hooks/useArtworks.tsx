import { useQuery } from "@tanstack/react-query";
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
