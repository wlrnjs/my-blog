import { Post, supabase } from "@/shared/supabase/supabase";

type TagInfo = {
  slug: string;
  display_name: string | null;
};

export async function getPostsByTagSlug(
  tagSlug: string
): Promise<{ posts: Post[]; tag: TagInfo | null }> {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `*,
      post_tags!inner(
        tags!inner(
          slug,
          display_name
        )
      )`
    )
    .eq("status", "published")
    .eq("post_tags.tags.slug", tagSlug)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts by tag slug:", error);
    return { posts: [], tag: null };
  }

  const posts = (data ?? []) as unknown as Post[];

  const tag = (data?.[0] as any)?.post_tags?.[0]?.tags ?? null;

  return { posts, tag };
}
