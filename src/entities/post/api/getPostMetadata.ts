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

// ⚡ Bolt: Wrap database query in React's cache() to deduplicate fetches during SSR
// This uses a lightweight query specifically for generateMetadata to avoid fetching the large content column,
// optimizing Time To First Byte (TTFB) since generateMetadata blocks page rendering.
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
    console.error("포스트 메타데이터를 불러오는 중 오류가 발생했습니다:", error);
    return null;
  }

  return data;
});
