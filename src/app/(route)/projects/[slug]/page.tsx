import { Article } from "@/shared/ui";
import { PROJECT_MAP } from "@/entities/project/model";

const ProjectDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const project = PROJECT_MAP[slug as keyof typeof PROJECT_MAP];

  return (
    <Article title={project?.title || slug}>
      <h2>상세페이지 공사중..</h2>
    </Article>
  );
};

export default ProjectDetailPage;
