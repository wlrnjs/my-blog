import { Category, supabase } from "@/shared/supabase/supabase";

export async function getAllCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("id,name,slug")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return (data ?? []) as Category[];
}
