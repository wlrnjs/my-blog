import { Post } from "@/shared/supabase/supabase";
import PostTitleLink from "./PostTitleLink";
import { getAllPosts } from "../api";

const PostList = async () => {
  const allPosts = await getAllPosts();

  return (
    <div className="prose dark:prose-invert">
      {allPosts.map((post: Post) => (
        <PostTitleLink key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
