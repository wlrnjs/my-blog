import { Metadata } from "next";
import { Article } from "@/shared/ui";
import { SlugPageProps } from "@/shared/types";
import { PROJECT_MAP } from "@/entities/project/model";
import { ProjectDetailContent } from "@/entities/project/ui";

const PROJECTS: Record<
  string,
  {
    title: string;
    oneLiner: string;
    period: string;
    role: string;
    team: string;
    techStack: string[];
    highlights: string[];
    links: { label: string; href: string }[];
  }
> = {
  "find-my-item": {
    title: "찾아줘!",
    oneLiner: "지도 기반 분실물 등록 및 실시간 채팅으로 연결되는 서비스",
    period: "2025.10 ~ 2025.12",
    role: "Frontend",
    team: "4명",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Zustand"],
    highlights: ["도메인 단위 구조 설계", "상태 관리/캐싱 전략 정리", "UI 컴포넌트 재사용성 강화"],
    links: [
      { label: "Repository", href: "https://github.com/wlrnjs" },
      { label: "Live", href: "https://example.com" },
    ],
  },
};

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
    // <Article title={project?.title || slug}>
    <div className="mt-4">
      <ProjectDetailContent slug={slug} project={project} />
    </div>
    // </Article>
  );
};

export default ProjectDetailPage;
