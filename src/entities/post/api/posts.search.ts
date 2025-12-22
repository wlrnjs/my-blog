import { supabase, SearchResult } from "@/shared/supabase/supabase";

export async function searchPosts(query: string): Promise<SearchResult[]> {
  const { data, error } = await supabase.rpc("search_posts", { query });

  if (error) {
    console.error("Error searching posts:", error);
    return [];
  }

  return data || [];
}
