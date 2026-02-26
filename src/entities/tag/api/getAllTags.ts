import { supabase } from "@/shared/supabase/supabase";
import { Tag } from "../model";

export async function getAllTags(): Promise<Tag[]> {
  const { data, error } = await supabase
    .from("tags")
    .select("id,name,slug")
    .order("name", { ascending: true });

  if (error) {
    console.error("태그 목록을 불러오는 중 오류가 발생했습니다:", error);
    return [];
  }

  return (data ?? []) as Tag[];
}
