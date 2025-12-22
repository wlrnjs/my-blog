import ProjectCard from "./ProjectCard";
import { PROJECTS } from "../model/projects";

const ProjectList = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {PROJECTS.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;
