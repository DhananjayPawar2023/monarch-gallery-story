import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface JournalEntry {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: "Essay" | "Interview" | "Feature";
  author: string;
  published_date: string;
  read_time: string;
  featured: boolean;
  status: string;
  cover_image_url?: string;
  created_at: string;
  updated_at: string;
}

export function useJournalEntries() {
  return useQuery({
    queryKey: ["journal-entries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("journal_entries")
        .select("*")
        .eq("status", "published")
        .order("published_date", { ascending: false });

      if (error) throw error;
      return data as JournalEntry[];
    },
  });
}

export function useAllJournalEntries() {
  return useQuery({
    queryKey: ["all-journal-entries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("journal_entries")
        .select("*")
        .order("published_date", { ascending: false });

      if (error) throw error;
      return data as JournalEntry[];
    },
  });
}

export function useJournalEntry(slug: string) {
  return useQuery({
    queryKey: ["journal-entry", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("journal_entries")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;
      return data as JournalEntry | null;
    },
    enabled: !!slug,
  });
}

export function useCreateJournalEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (entry: Omit<JournalEntry, "id" | "created_at" | "updated_at"> & { created_by: string }) => {
      const { data, error } = await supabase
        .from("journal_entries")
        .insert([entry])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journal-entries"] });
      queryClient.invalidateQueries({ queryKey: ["all-journal-entries"] });
    },
  });
}

export function useUpdateJournalEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...entry }: Partial<JournalEntry> & { id: string }) => {
      const { data, error } = await supabase
        .from("journal_entries")
        .update(entry)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journal-entries"] });
      queryClient.invalidateQueries({ queryKey: ["all-journal-entries"] });
    },
  });
}

export function useDeleteJournalEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("journal_entries")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journal-entries"] });
      queryClient.invalidateQueries({ queryKey: ["all-journal-entries"] });
    },
  });
}
