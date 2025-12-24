import { supabase, Post } from "@/shared/supabase/supabase";

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

export async function getPostWithPrevNext(slug: string): Promise<PostWithPrevNext | null> {
  const { data, error } = await supabase.rpc("get_post_with_prev_next", {
    p_slug: slug,
  });

  if (error || !data?.post) {
    console.error("Error fetching post with nav:", error);
    return null;
  }

  return data as PostWithPrevNext;
}
