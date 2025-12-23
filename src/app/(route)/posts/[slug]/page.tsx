import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Article } from "@/shared/ui";
import { getPostBySlug } from "@/entities/post/api";

interface PostProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <Article title="Blog" intro={post.title}>
      {post.description && <ReactMarkdown>{post.description}</ReactMarkdown>}
      <hr className="my-4" />
    </Article>
  );
}
