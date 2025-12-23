import { Article } from "@/shared/ui";

const TagDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  return (
    <Article title={`#${slug}`}>
      <h2>상세페이지 공사중..</h2>
    </Article>
  );
};

export default TagDetailPage;
