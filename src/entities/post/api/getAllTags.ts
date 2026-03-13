import { supabase } from "@/shared/supabase/supabase";

export async function getAllTags(): Promise<string[]> {
  const { data, error } = await supabase.rpc("get_all_tags");

  if (error) {
    console.error("태그 목록을 불러오는 중 오류가 발생했습니다:", error);
    return [];
  }

  // RPC 반환 결과에서 태그 배열만 추출합니다.
  return data?.map((row: any) => row.tag) || [];
}
