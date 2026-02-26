import { Post, supabase } from "@/shared/supabase/supabase";

export async function getAllPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("포스트 목록을 불러오는 중 오류가 발생했습니다:", error);
    return [];
  }

  return data || [];
}
