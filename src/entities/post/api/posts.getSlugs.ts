import { supabase } from "@/shared/supabase/supabase";

export async function getPostSlugs(): Promise<string[]> {
  const { data, error } = await supabase.from("posts").select("slug").eq("status", "published");

  if (error) {
    console.error("Error fetching post slugs:", error);
    return [];
  }

  return data?.map((post) => post.slug) || [];
}
