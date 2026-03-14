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

export interface GetPostsByTagParams {
  tagSlug: string;
  page?: number;
  limit?: number;
}

export async function getPostsByTagSlug({
  tagSlug,
  page = 1,
  limit = 10,
}: GetPostsByTagParams): Promise<{
  posts: Pick<Post, "id" | "slug" | "title" | "description" | "published_at">[];
  tag: TagInfo | null;
  totalCount: number;
}> {
  // Edge case handling: page cannot be less than 1, limit cannot be more than 100
  const validPage = Math.max(1, page);
  const validLimit = Math.min(100, Math.max(1, limit));

  const start = (validPage - 1) * validLimit;
  const end = start + validLimit - 1;

  const { data, error, count } = await supabase
    .from("posts")
    .select(
      `id, slug, title, description, published_at,
      post_tags!inner(
        tags!inner(
          slug,
          display_name
        )
      )`,
      { count: "exact" }
    )
    .eq("status", "published")
    .eq("post_tags.tags.slug", tagSlug)
    .order("published_at", { ascending: false })
    .range(start, end);

  if (error) {
    console.error("태그 슬러그로 포스트를 불러오는 중 오류가 발생했습니다:", error);
    return { posts: [], tag: null, totalCount: 0 };
  }

  const posts = (data ?? []) as unknown as Pick<
    Post,
    "id" | "slug" | "title" | "description" | "published_at"
  >[];

  const firstPost = data?.[0] as unknown as PostWithTags | undefined;
  const tag = firstPost?.post_tags?.[0]?.tags ?? null;

  return { posts, tag, totalCount: count ?? 0 };
}
