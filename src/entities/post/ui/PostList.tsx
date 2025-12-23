import { Post } from "@/shared/supabase/supabase";
import PostTitleLink from "./PostTitleLink";
import { getAllPosts } from "../api";

const PostList = async () => {
  const allPosts = await getAllPosts();

  return (
    <>
      {allPosts.map((post: Post) => (
        <PostTitleLink key={post.id} post={post} />
      ))}
    </>
  );
};

export default PostList;
