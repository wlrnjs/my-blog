import { Article, PostItem } from "@/shared/ui";
import { getPostsByTagSlug } from "@/entities/post/api";
import PostListEmpty from "@/shared/ui/post-list-empty/PostListEmpty";

const TagDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const posts = await getPostsByTagSlug(slug);

  return (
    <Article title={`#${slug}`}>
      <ul>
        {posts.length === 0 ? (
          <PostListEmpty />
        ) : (
          posts.map((item) => <PostItem key={item.id} post={item} />)
        )}
      </ul>
    </Article>
  );
};

export default TagDetailPage;
