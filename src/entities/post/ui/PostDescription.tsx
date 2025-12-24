import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import "highlight.js/styles/github-dark.css";
import "@/entities/post/styles/markdown.css";
import "@/entities/post/styles/highlight.css";
import "@/entities/post/styles/markdown-anchor.css";

interface PostDescriptionProps {
  post: {
    description?: string;
  };
}

const PostDescription = ({ post }: PostDescriptionProps) => {
  return (
    post.description && (
      <article aria-label="게시물 내용" className="prose max-w-none dark:prose-invert">
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
    )
  );
};

export default PostDescription;
