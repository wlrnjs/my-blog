import { Post, supabase } from "@/shared/supabase/supabase";

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) {
    console.error("포스트를 불러오는 중 오류가 발생했습니다:", error);
    return null;
  }

  return data;
}
