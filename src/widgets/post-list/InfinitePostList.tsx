"use client";

import { PostSummary } from "@/shared/ui";
import { PostEmpty, PostItem } from "@/shared/ui";
import { useInfiniteScroll } from "./lib/useInfiniteScroll";

interface InfinitePostListProps {
  initialPosts: PostSummary[];
}

const InfinitePostList = ({ initialPosts }: InfinitePostListProps) => {
  const { posts, isLoading, lastPostRef } = useInfiniteScroll({ initialPosts });

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
