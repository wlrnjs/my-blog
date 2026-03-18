import { Post, supabase } from "@/shared/supabase/supabase";
import { cache } from "react";

// ⚡ Bolt: select('...')를 통해 content 등 무거운 필드를 제외하고 메타데이터에 필요한 필드만 가져오도록 최적화
// React cache()를 적용하여 요청 내 중복 호출 시 DB 조회를 방지
export const getPostMetadataBySlug = cache(
  async (
    slug: string
  ): Promise<Pick<
    Post,
    | "id"
    | "slug"
    | "title"
    | "description"
    | "published_at"
    | "meta_title"
    | "meta_description"
    | "featured_image"
    | "og_image"
    | "author"
  > | null> => {
    const { data, error } = await supabase
      .from("posts")
      .select(
        "id, slug, title, description, published_at, meta_title, meta_description, featured_image, og_image, author"
      )
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (error) {
      console.error(
        "포스트 메타데이터를 불러오는 중 오류가 발생했습니다:",
        error
      );
      return null;
    }

    return data;
  }
);
