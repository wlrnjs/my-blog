import { useState, useRef, useCallback } from "react";
import { PostSummary } from "@/shared/ui";
import { getPosts } from "@/entities/post/api";

interface UseInfiniteScrollProps {
  initialPosts: PostSummary[];
}

export const useInfiniteScroll = ({ initialPosts }: UseInfiniteScrollProps) => {
  const [posts, setPosts] = useState<PostSummary[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialPosts.length === 10);
  const [isLoading, setIsLoading] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const fetchingRef = useRef(false);

  const loadMorePosts = async () => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    setIsLoading(true);
    const nextPage = page + 1;
    try {
      const newPosts = await getPosts({ page: nextPage, limit: 10 });
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setPage(nextPage);
        if (newPosts.length < 10) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error("Failed to load more posts:", error);
    } finally {
      fetchingRef.current = false;
      setIsLoading(false);
    }
  };

  const lastPostRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();

      if (node) {
        observerRef.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && hasMore) {
            loadMorePosts();
          }
        });
        observerRef.current.observe(node);
      }
    },
    [isLoading, hasMore, page]
  );

  return {
    posts,
    isLoading,
    lastPostRef,
  };
};
