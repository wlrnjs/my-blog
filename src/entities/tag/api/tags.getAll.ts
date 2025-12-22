import { supabase } from "@/shared/supabase/supabase";
import { Tag } from "../model";

export async function getAllTags(): Promise<Tag[]> {
  const { data, error } = await supabase
    .from("tags")
    .select("id,name,slug")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching tags:", error);
    return [];
  }

  return (data ?? []) as Tag[];
}
