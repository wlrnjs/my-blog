import { supabase } from "@/shared/supabase/supabase";

export async function getPostSlugs(): Promise<string[]> {
  const { data, error } = await supabase.from("posts").select("slug").eq("status", "published");

  if (error) {
    console.error("포스트 슬러그 목록을 불러오는 중 오류가 발생했습니다:", error);
    return [];
  }

  return data?.map((post) => post.slug) || [];
}
