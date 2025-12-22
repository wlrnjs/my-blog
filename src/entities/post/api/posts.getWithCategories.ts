import { PostWithCategories, supabase } from "@/shared/supabase/supabase";

export async function getPostsWithCategories(): Promise<PostWithCategories[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      post_categories(
        categories(*)
      )
    `
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts with categories:", error);
    return [];
  }

  // Transform the data to include categories directly
  return (
    data?.map((post) => ({
      ...post,
      categories: post.post_categories?.map((pc: any) => pc.categories) || [],
    })) || []
  );
}
