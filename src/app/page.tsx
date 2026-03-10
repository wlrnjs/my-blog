import { CategorySidebar, PostList } from "@/widgets";
import { getAllTagsWithCount } from "@/entities/tag/api";
import { getAllPosts } from "@/entities/post/api";

export const dynamic = "force-dynamic";

const Home = async () => {
  // Parallelize independent data fetching to reduce TTFB
  const [posts, tags] = await Promise.all([getAllPosts(), getAllTagsWithCount()]);

  return (
    <div className="mt-10 flex gap-10">
      <PostList posts={posts} />

      <aside className="hidden w-56 shrink-0 md:block lg:block">
        <CategorySidebar tags={tags} />
      </aside>
    </div>
  );
};

export default Home;
