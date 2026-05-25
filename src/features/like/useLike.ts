"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getPostLikeStatus, togglePostLike } from "./api";
import { useAnonymousId } from "./useAnonymousId";

const THROTTLE_MS = 800;

export function useLike(postId: string) {
  const anonymousId = useAnonymousId();
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const serverRef = useRef({ liked: false, count: 0 });
  const inFlightRef = useRef(false);
  const lastCalledAtRef = useRef(0);

  useEffect(() => {
    if (!anonymousId) return;

    getPostLikeStatus(postId, anonymousId)
      .then(({ liked, like_count }) => {
        serverRef.current = { liked, count: like_count };
        setLiked(liked);
        setCount(like_count);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [postId, anonymousId]);

  const toggle = useCallback(async () => {
    if (!anonymousId || loading) return;

    const now = Date.now();
    if (inFlightRef.current || now - lastCalledAtRef.current < THROTTLE_MS) return;

    lastCalledAtRef.current = now;
    inFlightRef.current = true;

    const snapshot = serverRef.current;
    const nextLiked = !liked;
    setLiked(nextLiked);
    setCount(nextLiked ? count + 1 : count - 1);

    try {
      const { liked: newLiked, like_count } = await togglePostLike(postId, anonymousId);
      serverRef.current = { liked: newLiked, count: like_count };
      setLiked(newLiked);
      setCount(like_count);
    } catch (err) {
      console.error("[useLike] toggle failed, rolling back:", err);
      setLiked(snapshot.liked);
      setCount(snapshot.count);
    } finally {
      inFlightRef.current = false;
    }
  }, [postId, anonymousId, loading, liked, count]);

  return { liked, count, loading, toggle };
}
