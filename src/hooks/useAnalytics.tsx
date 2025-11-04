import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useAnalytics() {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const [artistsCount, artworksCount, collectionsCount, journalCount] = await Promise.all([
        supabase.from("artists").select("id", { count: "exact", head: true }),
        supabase.from("artworks").select("id", { count: "exact", head: true }),
        supabase.from("collections").select("id", { count: "exact", head: true }),
        supabase.from("journal_entries").select("id", { count: "exact", head: true }),
      ]);

      return {
        totalArtists: artistsCount.count || 0,
        totalArtworks: artworksCount.count || 0,
        totalCollections: collectionsCount.count || 0,
        totalJournalEntries: journalCount.count || 0,
      };
    },
  });
}
