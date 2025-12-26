import { notFound } from "next/navigation";
import { Article } from "@/shared/ui";
import { getPostWithPrevNext, getRelatedPostsByTagSlug } from "@/entities/post/api";
import { PostDescription, PostMeta, PostNav, RelatedPosts } from "@/entities/post/ui";

interface PostProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostProps) {
  const { slug } = await params;
  const result = await getPostWithPrevNext(slug);

  if (!result) notFound();

  const { post, prev, next } = result;
  const relatedPosts = await getRelatedPostsByTagSlug({
    tagSlug: post.tags?.[0] || "",
    currentPostId: post.id,
  });

  return (
    <Article title="Blog" intro={post.title}>
      <PostMeta publishedAt={post.published_at} tags={post.tags || []} />
      <PostDescription post={post} />
      <PostNav prev={prev} next={next} />
      <RelatedPosts posts={relatedPosts} />
    </Article>
  );
}
