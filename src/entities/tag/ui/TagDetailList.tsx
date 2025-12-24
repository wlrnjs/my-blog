import { Post } from "@/shared/supabase/supabase";
import { PostEmpty, PostItem } from "@/shared/ui";

const TagDetailList = ({ posts }: { posts: Post[] }) => {
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

export default TagDetailList;
