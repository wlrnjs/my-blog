import { Post, supabase } from "@/shared/supabase/supabase";

export async function getPostsByTagSlug(tagSlug: string): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `*,
      post_tags!inner(
        tag_id,
        tags!inner(slug)
      )`
    )
    .eq("status", "published")
    .eq("post_tags.tags.slug", tagSlug)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts by tag slug:", error);
    return [];
  }

  return (data ?? []) as unknown as Post[];
}
