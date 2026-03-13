"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { PostSummary } from "@/shared/ui";
import { PostEmpty, PostItem } from "@/shared/ui";
import { getPosts } from "@/entities/post/api";

interface InfinitePostListProps {
  initialPosts: PostSummary[];
}

const InfinitePostList = ({ initialPosts }: InfinitePostListProps) => {
  const [posts, setPosts] = useState<PostSummary[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialPosts.length === 10);
  const [isLoading, setIsLoading] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useCallback(
    (node: HTMLLIElement) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMorePosts();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const loadMorePosts = async () => {
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
      setIsLoading(false);
    }
  };

  if (posts.length === 0) {
    return <PostEmpty />;
  }

  return (
    <ul className="w-full">
      {posts.map((item, index) => {
        if (posts.length === index + 1) {
          return <PostItem ref={lastPostRef} key={item.id} post={item} />;
        }
        return <PostItem key={item.id} post={item} />;
      })}
      {isLoading && (
        <li className="py-4 text-center text-sm text-slate-500">
          로딩 중...
        </li>
      )}
    </ul>
  );
};

export default InfinitePostList;
