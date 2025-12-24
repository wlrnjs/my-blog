import { Article } from "@/shared/ui";
import { TagDetailList } from "@/entities/tag/ui";
import { getPostsByTagSlug } from "@/entities/post/api";

const TagDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const posts = await getPostsByTagSlug(slug);

  return (
    <Article title={`#${slug}`}>
      <TagDetailList posts={posts} />
    </Article>
  );
};

export default TagDetailPage;
