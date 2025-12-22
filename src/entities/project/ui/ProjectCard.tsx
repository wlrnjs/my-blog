import Image from "next/image";
import { Project } from "../model/types";
import { cn } from "@/shared/lib";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { slug, techStack, thumbnail, featured } = project;

  return (
    <Link
      href={`/projects/${slug}`}
      className={cn(
        "group rounded-lg border border-slate-200 bg-white p-4 transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-950",
        featured && "border-indigo-500 dark:border-indigo-400"
      )}
    >
      <div className="mb-3 flex h-[140px] items-center justify-center rounded-md bg-slate-100 dark:bg-slate-900">
        <Image
          src={thumbnail.src}
          alt={thumbnail.alt}
          width={80}
          height={80}
          className="object-contain"
        />
      </div>

      <h2 className="text-lg font-semibold tracking-tight">{project.title}</h2>
      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{project.period}</p>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{project.summary}</p>

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
    </Link>
  );
};
export default ProjectCard;
