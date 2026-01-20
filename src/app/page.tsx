import { PostList } from "@/widgets";
import { getAllPosts } from "@/entities/post/api";

export const dynamic = "force-dynamic";

const Home = async () => {
  const posts = await getAllPosts();

  return <PostList posts={posts} />;
};

export default Home;
