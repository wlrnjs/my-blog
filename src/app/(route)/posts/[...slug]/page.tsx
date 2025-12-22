import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/entities/post/api/api";
import ReactMarkdown from "react-markdown";
import { Article } from "@/shared/ui";

interface PostProps {
  params: Promise<{
    slug: string[];
  }>;
}

async function getPostFromParams(params: PostProps["params"]) {
  const { slug } = await params;
  const slugPath = slug?.join("/");
  const post = await getPostBySlug(slugPath);

  if (!post) {
    notFound();
  }

  return post;
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  const allPosts = await getAllPosts();
  return allPosts.map((post) => ({
    slug: post.slug.split("/"),
  }));
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <Article title="Blog" intro={post.title}>
      {post.description && <ReactMarkdown>{post.description}</ReactMarkdown>}
      <hr className="my-4" />
    </Article>
  );
}
