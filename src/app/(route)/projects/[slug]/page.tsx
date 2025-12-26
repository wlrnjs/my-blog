import { Metadata } from "next";
import { Article } from "@/shared/ui";
import { SlugPageProps } from "@/shared/types";
import { PROJECT_MAP } from "@/entities/project/model";

export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECT_MAP[slug as keyof typeof PROJECT_MAP];

  const title = project?.title || slug;
  const description = `${project?.title || slug} 프로젝트를 소개합니다.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/projects/${slug}`,
    },
    alternates: {
      canonical: `/projects/${slug}`,
    },
  };
}

const ProjectDetailPage = async ({ params }: SlugPageProps) => {
  const { slug } = await params;
  const project = PROJECT_MAP[slug as keyof typeof PROJECT_MAP];

  return (
    <Article title={project?.title || slug}>
      <h2>상세페이지 공사중..</h2>
    </Article>
  );
};

export default ProjectDetailPage;
