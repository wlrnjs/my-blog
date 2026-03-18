import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Article } from "@/shared/ui";
import { SlugPageProps } from "@/shared/types";
import { getPostMetadataBySlug, getPostWithPrevNext, getRelatedPostsByTagSlug } from "@/entities/post/api";
import { PostDescription, PostMeta, PostNav, RelatedPosts } from "@/entities/post/ui";

export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostMetadataBySlug(slug);

  if (!post) {
    return {
      title: "Not Found",
      description: "페이지를 찾을 수 없습니다.",
    };
  }

  const title = post.meta_title || post.title;
  const description = post.meta_description || post.description || "";
  const images = post.og_image ? [post.og_image] : post.featured_image ? [post.featured_image] : [];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.published_at,
      authors: post.author ? [post.author] : [],
      url: `/posts/${slug}`,
      ...(images.length > 0 && { images }),
    },
    alternates: {
      canonical: `/posts/${slug}`,
    },
  };
}

export default async function PostPage({ params }: SlugPageProps) {
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
      <PostMeta
        tags={post.tags || []}
        data={{
          publishedAt: post.published_at,
          readingTime: post.reading_time || 0,
        }}
      />
      <PostDescription post={post} />
      <PostNav prev={prev} next={next} />
      <RelatedPosts posts={relatedPosts} />
    </Article>
  );
}
