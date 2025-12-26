import { Metadata } from "next";
import { Article } from "@/shared/ui";
import { ProjectList } from "@/entities/project/ui";

export const metadata: Metadata = {
  title: "Projects",
  description: "진행한 프로젝트를 한눈에 볼 수 있습니다.",
  openGraph: {
    title: "Projects",
    description: "진행한 프로젝트를 한눈에 볼 수 있습니다.",
    url: "/projects",
  },
  alternates: {
    canonical: "/projects",
  },
};

const ProjectsPage = () => {
  return (
    <Article title="Projects">
      <ProjectList />
    </Article>
  );
};

export default ProjectsPage;
