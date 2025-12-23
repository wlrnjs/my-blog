import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { Article } from "@/shared/ui";
import { getPostBySlug } from "@/entities/post/api";

import "highlight.js/styles/github-dark.css";
import "@/entities/post/styles/markdown.css";
import "@/entities/post/styles/highlight.css";
import "@/entities/post/styles/markdown-anchor.css";

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
            rehypePlugins={[
              rehypeHighlight,
              rehypeSlug,
              [
                rehypeAutolinkHeadings,
                {
                  behavior: "append",
                  properties: { className: ["heading-anchor"] },
                  content: [{ type: "text", value: "#" }],
                },
              ],
            ]}
          >
            {post.description}
          </ReactMarkdown>
        </article>
      )}
    </Article>
  );
}
