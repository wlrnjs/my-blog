import { supabase } from "@/shared/supabase/supabase";
import { TagWithCount } from "../model/types";

export async function getAllTagsWithCount(): Promise<TagWithCount[]> {
  const { data, error } = await supabase
    .from("tags_with_post_count")
    .select("id,name,slug,description,post_count")
    .order("post_count", { ascending: false })
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching tags with count:", error);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? null,
    postCount: Number(row.post_count ?? 0),
  }));
}
