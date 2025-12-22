import Link from "next/link";
import { Post } from "@/shared/supabase/supabase";

const PostTitleLink = ({ post }: { post: Post }) => {
  return (
    <article>
      <Link href={`/posts/${post.slug}`}>
        <h2 className="line-clamp-2">{post.title}</h2>
      </Link>
    </article>
  );
};

export default PostTitleLink;
