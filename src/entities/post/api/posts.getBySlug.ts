import { Post, supabase } from "@/shared/supabase/supabase";

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) {
    console.error("Error fetching post:", error);
    return null;
  }

  return data;
}
