import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Collector = Database["public"]["Tables"]["collectors"]["Row"];
type CollectorInsert = Database["public"]["Tables"]["collectors"]["Insert"];
type CollectorUpdate = Database["public"]["Tables"]["collectors"]["Update"];

export const useCollectorsData = () => {
  return useQuery({
    queryKey: ["collectors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("collectors")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};

export const useCollector = (id: string) => {
  return useQuery({
    queryKey: ["collector", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("collectors")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateCollector = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (collector: CollectorInsert) => {
      const { data, error } = await supabase
        .from("collectors")
        .insert(collector)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collectors"] });
    },
  });
};

export const useUpdateCollector = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: CollectorUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from("collectors")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collectors"] });
    },
  });
};

export const useDeleteCollector = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("collectors")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collectors"] });
    },
  });
};
