import { CategorySidebar, PostList } from "@/widgets";
import { getAllTagsWithCount } from "@/entities/tag/api";
import { getAllPosts } from "@/entities/post/api";

export const dynamic = "force-dynamic";

const Home = async () => {
  // [성능 최적화] 메인 페이지의 포스트 목록과 태그 목록 페칭을 병렬로 처리하여 TTFB(Time To First Byte)를 단축합니다.
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
