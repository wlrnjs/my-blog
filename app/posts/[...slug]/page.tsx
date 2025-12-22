import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/api";
import { Metadata } from "next";

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

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
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
    <article className="py-6">
      <h1 className="mb-2">{post.title}</h1>
      {post.description && (
        <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">
          {post.description}
        </p>
      )}
      <hr className="my-4" />
    </article>
  );
}
