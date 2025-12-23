import { ReactNode } from "react";
import { cn } from "@/shared/lib";
import { ClassNameValue } from "tailwind-merge";

interface AboutSectionProps {
  title: string;
  children: ReactNode;
  className?: ClassNameValue;
}

const AboutSection = ({ title, children, className }: AboutSectionProps) => {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold tracking-tight" id={title}>
        {title}
      </h2>
      <div className={cn("text-sm leading-relaxed text-slate-600 dark:text-slate-300", className)}>
        {children}
      </div>
    </section>
  );
};

export default AboutSection;
