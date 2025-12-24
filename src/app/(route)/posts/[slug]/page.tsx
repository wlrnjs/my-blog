import { notFound } from "next/navigation";
import { Article } from "@/shared/ui";
import { getPostWithPrevNext } from "@/entities/post/api";
import { PostDescription, PostNav } from "@/entities/post/ui";

import "highlight.js/styles/github-dark.css";
import "@/entities/post/styles/markdown.css";
import "@/entities/post/styles/highlight.css";
import "@/entities/post/styles/markdown-anchor.css";

interface PostProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostProps) {
  const { slug } = await params;
  const result = await getPostWithPrevNext(slug);

  if (!result) notFound();

  const { post, prev, next } = result;

  return (
    <Article title="Blog" intro={post.title}>
      <PostDescription post={post} />
      <PostNav prev={prev} next={next} />
    </Article>
  );
}
