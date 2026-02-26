import { supabase } from "@/shared/supabase/supabase";

export async function getAllTags(): Promise<string[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("tags")
    .eq("status", "published")
    .not("tags", "is", null);

  if (error) {
    console.error("태그 목록을 불러오는 중 오류가 발생했습니다:", error);
    return [];
  }

  // 모든 태그를 추출하고 평탄화한 후 중복을 제거합니다.
  const allTags = data?.flatMap((post) => post.tags || []) || [];
  return Array.from(new Set(allTags)).sort();
}
