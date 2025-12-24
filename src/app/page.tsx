import { PostList } from "@/widgets";
import { getAllPosts } from "@/entities/post/api";

const Home = async () => {
  const posts = await getAllPosts();

  return <PostList posts={posts} />;
};

export default Home;
