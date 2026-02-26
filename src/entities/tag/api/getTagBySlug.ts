import { supabase } from "@/shared/supabase/supabase";

export type TagInfo = {
  slug: string;
  display_name: string | null;
};

export async function getTagBySlug(tagSlug: string): Promise<TagInfo | null> {
  const { data, error } = await supabase
    .from("tags")
    .select("slug, display_name")
    .eq("slug", tagSlug)
    .maybeSingle();

  if (error) {
    console.error("태그 슬러그로 태그 정보를 불러오는 중 오류가 발생했습니다:", error);
    return null;
  }

  return data;
}
