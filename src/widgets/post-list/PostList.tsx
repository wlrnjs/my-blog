import { PostSummary } from "@/shared/ui";
import { PostEmpty, PostItem } from "@/shared/ui";

const PostList = ({ posts }: { posts: PostSummary[] }) => {
  return (
    <ul>
      {posts.length === 0 ? (
        <PostEmpty />
      ) : (
        posts.map((item) => <PostItem key={item.id} post={item} />)
      )}
    </ul>
  );
};

export default PostList;
