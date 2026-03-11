import { CategorySidebar, PostList } from "@/widgets";
import { getAllTagsWithCount } from "@/entities/tag/api";
import { getAllPosts } from "@/entities/post/api";

export const dynamic = "force-dynamic";

const Home = async () => {
  // ⚡ Bolt Optimization: Parallel Data Fetching
  // 💡 What: Replaced sequential awaits with Promise.all
  // 🎯 Why: 'force-dynamic' routes must wait for all fetches before rendering. Sequential fetches increase TTFB.
  // 📊 Impact: Reduces total fetch time from (getAllPosts time + getAllTagsWithCount time) to MAX(getAllPosts time, getAllTagsWithCount time).
  const [posts, tags] = await Promise.all([
    getAllPosts(),
    getAllTagsWithCount()
  ]);

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
