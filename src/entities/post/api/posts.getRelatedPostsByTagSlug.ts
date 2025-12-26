import { supabase } from "@/shared/supabase/supabase";

type RelatedPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  published_at: string;
  featured_image: string | null;
};

type GetRelatedPostsParams = {
  tagSlug: string;
  currentPostId: string;
  limit?: number;
};

export async function getRelatedPostsByTagSlug({
  tagSlug,
  currentPostId,
  limit = 8,
}: GetRelatedPostsParams): Promise<RelatedPost[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("id, slug, title, description, published_at, featured_image")
    .eq("status", "published")
    .contains("tags", [tagSlug])
    .neq("id", currentPostId)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }

  return (data ?? []) as RelatedPost[];
}
