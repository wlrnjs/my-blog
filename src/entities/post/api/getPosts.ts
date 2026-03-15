import { Post, supabase } from "@/shared/supabase/supabase";

export async function getPosts({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
} = {}): Promise<
  Pick<Post, "id" | "slug" | "title" | "description" | "published_at">[]
> {
  if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
    return [
      {
        id: "1",
        slug: "test-post",
        title: "테스트 포스트",
        description: "테스트 포스트 설명입니다.",
        published_at: new Date().toISOString(),
      },
    ];
  }

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error } = await supabase
    .from("posts")
    .select("id, slug, title, description, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .range(from, to);

  if (error) {
    throw new Error(`포스트 목록을 불러오는 중 오류가 발생했습니다: ${error.message}`);
  }

  return data || [];
}
