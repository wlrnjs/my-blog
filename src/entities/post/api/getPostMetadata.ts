import { cache } from "react";
import { Post, supabase } from "@/shared/supabase/supabase";

export type PostMetadata = Pick<
  Post,
  | "title"
  | "description"
  | "meta_title"
  | "meta_description"
  | "og_image"
  | "featured_image"
  | "published_at"
  | "author"
>;

// ⚡ Bolt: SSR 중 데이터 페칭 중복을 방지하기 위해 React의 cache()로 데이터베이스 쿼리를 감쌉니다.
// 이 함수는 generateMetadata에서 무거운 content 컬럼을 불러오는 것을 방지하기 위해 특별히 가벼운 쿼리를 사용하며,
// generateMetadata가 페이지 렌더링을 차단하므로 TTFB(Time To First Byte)를 최적화합니다.
export const getPostMetadata = cache(async (slug: string): Promise<PostMetadata | null> => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      "title, description, meta_title, meta_description, og_image, featured_image, published_at, author"
    )
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) {
    if (error.code !== "PGRST116") {
      console.error("포스트 메타데이터를 불러오는 중 오류가 발생했습니다:", error);
    }
    return null;
  }

  return data;
});
