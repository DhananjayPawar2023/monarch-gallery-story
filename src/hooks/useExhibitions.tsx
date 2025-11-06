import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Exhibition = Database["public"]["Tables"]["exhibitions"]["Row"];
type ExhibitionInsert = Database["public"]["Tables"]["exhibitions"]["Insert"];
type ExhibitionUpdate = Database["public"]["Tables"]["exhibitions"]["Update"];

export const useExhibitions = () => {
  return useQuery({
    queryKey: ["exhibitions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("exhibitions")
        .select("*")
        .order("start_date", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};

export const useExhibition = (slug: string) => {
  return useQuery({
    queryKey: ["exhibition", slug],
    queryFn: async () => {
      const { data: exhibition, error: exhibitionError } = await supabase
        .from("exhibitions")
        .select("*")
        .eq("slug", slug)
        .single();

      if (exhibitionError) throw exhibitionError;

      // Get artworks for this exhibition
      const { data: exhibitionArtworks, error: artworksError } = await supabase
        .from("exhibition_artworks")
        .select("*, artworks(*, artists(*))")
        .eq("exhibition_id", exhibition.id)
        .order("display_order", { ascending: true });

      if (artworksError) throw artworksError;

      return {
        ...exhibition,
        artworks: exhibitionArtworks,
      };
    },
    enabled: !!slug,
  });
};

export const useCreateExhibition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (exhibition: ExhibitionInsert) => {
      const { data, error } = await supabase
        .from("exhibitions")
        .insert(exhibition)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exhibitions"] });
    },
  });
};

export const useUpdateExhibition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: ExhibitionUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from("exhibitions")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exhibitions"] });
    },
  });
};

export const useDeleteExhibition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("exhibitions")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exhibitions"] });
    },
  });
};
