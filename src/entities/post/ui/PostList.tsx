import { getAllPosts } from "../api/api";
import PostTitleLink from "./PostTitleLink";

const PostList = async () => {
  const allPosts = await getAllPosts();

  return (
    <div className="prose dark:prose-invert">
      {allPosts.map((post) => (
        <PostTitleLink key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
