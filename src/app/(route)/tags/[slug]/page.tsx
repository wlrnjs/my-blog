import { PostList } from "@/widgets";
import { Article } from "@/shared/ui";
import { getPostsByTagSlug } from "@/entities/post/api";

const TagDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const { posts, tag } = await getPostsByTagSlug(slug);

  const title = tag?.display_name ?? slug;

  return (
    <Article title={`#${title}`}>
      <PostList posts={posts} />
    </Article>
  );
};

export default TagDetailPage;
