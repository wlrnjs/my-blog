import { Post, Category, PostWithCategories, supabase } from "@/shared/supabase/supabase";

interface PostWithRawCategories
  extends Pick<
    Post,
    "id" | "slug" | "title" | "description" | "published_at"
  > {
  post_categories: { categories: Category }[];
}

export async function getPostsWithCategories(): Promise<PostWithCategories[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      id, slug, title, description, published_at,
      post_categories(
        categories(id, name, slug, color)
      )
    `
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("포스트와 카테고리 목록을 불러오는 중 오류가 발생했습니다:", error);
    return [];
  }

  // 데이터 타입을 변환하여 카테고리를 직접 포함하도록 합니다.
  const posts = data as unknown as PostWithRawCategories[];

  return (
    posts?.map((post) => ({
      ...post,
      categories: post.post_categories?.map((pc) => pc.categories) || [],
    })) || []
  );
}
