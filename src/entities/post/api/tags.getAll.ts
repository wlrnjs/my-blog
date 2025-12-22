import { supabase } from "@/shared/supabase/supabase";

export async function getAllTags(): Promise<string[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("tags")
    .eq("status", "published")
    .not("tags", "is", null);

  if (error) {
    console.error("Error fetching tags:", error);
    return [];
  }

  // Extract and flatten all tags, then get unique ones
  const allTags = data?.flatMap((post) => post.tags || []) || [];
  return Array.from(new Set(allTags)).sort();
}
