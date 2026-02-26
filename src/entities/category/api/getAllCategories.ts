import { Category, supabase } from "@/shared/supabase/supabase";

export async function getAllCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("id,name,slug")
    .order("name", { ascending: true });

  if (error) {
    console.error("카테고리 목록을 불러오는 중 오류가 발생했습니다:", error);
    return [];
  }

  return (data ?? []) as Category[];
}
