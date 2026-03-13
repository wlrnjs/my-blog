import { CategorySidebar, InfinitePostList } from "@/widgets";
import { getAllTagsWithCount } from "@/entities/tag/api";
import { getPosts } from "@/entities/post/api";

export const dynamic = "force-dynamic";

const Home = async () => {
  const [posts, tags] = await Promise.all([
    getPosts({ page: 1, limit: 10 }),
    getAllTagsWithCount(),
  ]);

  return (
    <div className="mt-10 flex gap-10">
      <div className="flex-1">
        <InfinitePostList initialPosts={posts} />
      </div>

      <aside className="hidden w-56 shrink-0 md:block lg:block">
        <CategorySidebar tags={tags} />
      </aside>
    </div>
  );
};

export default Home;
