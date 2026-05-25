import { supabase } from "@/shared/supabase/supabase";

export interface LikeStatus {
  liked: boolean;
  like_count: number;
}

function parseRpcResult(data: unknown): LikeStatus {
  const row = Array.isArray(data) ? data[0] : data;
  return row as LikeStatus;
}

export async function getPostLikeStatus(postId: string, anonymousId: string): Promise<LikeStatus> {
  const { data, error } = await supabase.rpc("get_post_like_status", {
    target_post_id: postId,
    target_anonymous_id: anonymousId,
  });

  if (error) {
    console.error("[getPostLikeStatus] error:", error, { postId, anonymousId });
    throw error;
  }

  return parseRpcResult(data);
}

export async function togglePostLike(postId: string, anonymousId: string): Promise<LikeStatus> {
  const { data, error } = await supabase.rpc("toggle_post_like", {
    target_post_id: postId,
    target_anonymous_id: anonymousId,
  });

  if (error) {
    console.error("[togglePostLike] error:", error, { postId, anonymousId });
    throw error;
  }

  return parseRpcResult(data);
}
