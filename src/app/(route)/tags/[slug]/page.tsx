import { Metadata } from "next";
import { PostList } from "@/widgets";
import { Article } from "@/shared/ui";
import { SlugPageProps } from "@/shared/types";
import { getPostsByTagSlug } from "@/entities/post/api";
import { getTagBySlug } from "@/entities/tag/api";

export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);

  const title = `#${tag?.display_name ?? slug}`;
  const description = `${tag?.display_name ?? slug} 태그의 글을 모아봅니다.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/tags/${slug}`,
    },
    alternates: {
      canonical: `/tags/${slug}`,
    },
  };
}

const TagDetailPage = async ({ params }: SlugPageProps) => {
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
