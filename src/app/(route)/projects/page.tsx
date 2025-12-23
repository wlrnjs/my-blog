import { Article } from "@/shared/ui";
import { ProjectList } from "@/entities/project/ui";

const page = () => {
  return (
    <Article title="Projects">
      <ProjectList />
    </Article>
  );
};

export default page;
