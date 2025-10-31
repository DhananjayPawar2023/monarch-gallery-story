import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Collection {
  id: string;
  name: string;
  description: string;
  curator_statement: string;
  cover_image_url?: string;
  release_date: string;
  status: string;
  audio_url?: string;
  audio_title?: string;
}

export function useCollections() {
  return useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("collections")
        .select("*")
        .eq("status", "published")
        .order("release_date", { ascending: false });

      if (error) throw error;
      return data as Collection[];
    },
  });
}

export function useAllCollections() {
  return useQuery({
    queryKey: ["all-collections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("collections")
        .select("*")
        .order("release_date", { ascending: false });

      if (error) throw error;
      return data as Collection[];
    },
  });
}
