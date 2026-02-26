import { supabase, SearchResult } from "@/shared/supabase/supabase";

export async function searchPosts(query: string): Promise<SearchResult[]> {
  const { data, error } = await supabase.rpc("search_posts", { query });

  if (error) {
    console.error("포스트 검색 중 오류가 발생했습니다:", error);
    return [];
  }

  return data || [];
}
