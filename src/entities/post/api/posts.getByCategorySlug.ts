import { Post, supabase } from "@/shared/supabase/supabase";

export async function getPostsByCategorySlug(categorySlug: string): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `*,
      post_categories!inner(
        category_id,
        categories!inner(slug)
      )`
    )
    .eq("status", "published")
    .eq("post_categories.categories.slug", categorySlug)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts by category slug:", error);
    return [];
  }

  return (data ?? []) as unknown as Post[];
}
