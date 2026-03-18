import { supabase, Post } from "@/shared/supabase/supabase";
import { cache } from "react";

type PostNav = {
  id: string;
  slug: string;
  title: string;
};

type PostWithPrevNext = {
  post: Post;
  prev: PostNav | null;
  next: PostNav | null;
};

// ⚡ Bolt: React cache()를 적용하여 요청 내 중복 호출 시 DB 조회를 방지
export const getPostWithPrevNext = cache(async (slug: string): Promise<PostWithPrevNext | null> => {
  const { data, error } = await supabase.rpc("get_post_with_prev_next", {
    p_slug: slug,
  });

  if (error || !data?.post) {
    console.error("이전/다음 포스트 정보를 포함하여 포스트를 불러오는 중 오류가 발생했습니다:", error);
    return null;
  }

  return data as PostWithPrevNext;
});
