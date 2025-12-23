import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Article } from "@/shared/ui";
import { getPostBySlug } from "@/entities/post/api";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface PostProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <Article title="Blog" intro={post.title}>
      {post.description && (
        <article className="prose max-w-none dark:prose-invert">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            rehypePlugins={[rehypeHighlight]}
          >
            {post.description}
          </ReactMarkdown>
        </article>
      )}
    </Article>
  );
}
