import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

interface PostDescriptionProps {
  post: {
    description?: string;
  };
}

const PostDescription = ({ post }: PostDescriptionProps) => {
  return (
    post.description && (
      <section className="prose max-w-none dark:prose-invert">
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
      </section>
    )
  );
};

export default PostDescription;
