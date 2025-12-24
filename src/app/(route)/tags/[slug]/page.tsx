import { PostList } from "@/widgets";
import { Article } from "@/shared/ui";
import { getPostsByTagSlug } from "@/entities/post/api";

const TagDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const posts = await getPostsByTagSlug(slug);

  return (
    <Article title={`#${slug}`}>
      <PostList posts={posts} />
    </Article>
  );
};

export default TagDetailPage;
