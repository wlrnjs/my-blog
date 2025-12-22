import Image from "next/image";
import { Project } from "../model/types";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { image, title, summary, techStack } = project;

  return (
    <div className="group rounded-lg border border-slate-200 bg-white p-4 transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
      {/* Thumbnail */}
      <div className="mb-3 flex h-[140px] items-center justify-center rounded-md bg-slate-100 dark:bg-slate-900">
        <Image src={image.src} alt={image.alt} width={80} height={80} className="object-contain" />
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>

      {/* Description */}
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{summary}</p>

      {/* Tech stack */}
      <ul className="mt-3 flex flex-wrap gap-1">
        {techStack.map((tech) => (
          <li
            key={tech}
            className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectCard;
