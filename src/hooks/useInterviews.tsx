import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Interview = Database["public"]["Tables"]["artist_interviews"]["Row"];
type InterviewInsert = Database["public"]["Tables"]["artist_interviews"]["Insert"];
type InterviewUpdate = Database["public"]["Tables"]["artist_interviews"]["Update"];

export const useInterviews = () => {
  return useQuery({
    queryKey: ["interviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("artist_interviews")
        .select("*, artists(*)")
        .order("interview_date", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};

export const useInterview = (slug: string) => {
  return useQuery({
    queryKey: ["interview", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("artist_interviews")
        .select("*, artists(*)")
        .eq("slug", slug)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });
};

export const useCreateInterview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (interview: InterviewInsert) => {
      const { data, error } = await supabase
        .from("artist_interviews")
        .insert(interview)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interviews"] });
    },
  });
};

export const useUpdateInterview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: InterviewUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from("artist_interviews")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interviews"] });
    },
  });
};

export const useDeleteInterview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("artist_interviews")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interviews"] });
    },
  });
};
