import { Post, supabase } from "@/shared/supabase/supabase";

export async function getPostsByCategorySlug(
  categorySlug: string
): Promise<Pick<Post, "id" | "slug" | "title" | "description" | "published_at">[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `id, slug, title, description, published_at,
      post_categories!inner(
        category_id,
        categories!inner(slug)
      )`
    )
    .eq("status", "published")
    .eq("post_categories.categories.slug", categorySlug)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("카테고리 슬러그로 포스트 목록을 불러오는 중 오류가 발생했습니다:", error);
    return [];
  }

  return (data ?? []) as unknown as Pick<Post, "id" | "slug" | "title" | "description" | "published_at">[];
}
