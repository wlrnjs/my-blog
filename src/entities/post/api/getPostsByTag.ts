import { Post, supabase } from "@/shared/supabase/supabase";

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .contains("tags", [tag])
    .order("published_at", { ascending: false });

  if (error) {
    console.error("태그로 포스트 목록을 불러오는 중 오류가 발생했습니다:", error);
    return [];
  }

  return data || [];
}
