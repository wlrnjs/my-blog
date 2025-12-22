import { Post, supabase } from "@/shared/supabase/supabase";

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .contains("tags", [tag])
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts by tag:", error);
    return [];
  }

  return data || [];
}
