import { Post, supabase } from "@/shared/supabase/supabase";

type TagInfo = {
  slug: string;
  display_name: string | null;
};

interface PostWithTags extends Post {
  post_tags: {
    tags: TagInfo;
  }[];
}

export async function getPostsByTagSlug(
  tagSlug: string
): Promise<{ posts: Pick<Post, "id" | "slug" | "title" | "description" | "published_at">[]; tag: TagInfo | null }> {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `id, slug, title, description, published_at,
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
    console.error("태그 슬러그로 포스트를 불러오는 중 오류가 발생했습니다:", error);
    return { posts: [], tag: null };
  }

  const posts = (data ?? []) as unknown as Pick<Post, "id" | "slug" | "title" | "description" | "published_at">[];

  const firstPost = data?.[0] as unknown as PostWithTags | undefined;
  const tag = firstPost?.post_tags?.[0]?.tags ?? null;

  return { posts, tag };
}
