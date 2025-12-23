import Link from "next/link";
import { Post } from "@/shared/supabase/supabase";

const PostTitleLink = ({ post }: { post: Post }) => {
  const { title, slug } = post;

  return (
    <article className="border-b border-slate-200 py-4 dark:border-slate-800">
      <Link href={`/posts/${slug}`} className="group block">
        <h2 className="relative my-1 line-clamp-2 text-lg font-medium">{title}</h2>
      </Link>
    </article>
  );
};

export default PostTitleLink;
