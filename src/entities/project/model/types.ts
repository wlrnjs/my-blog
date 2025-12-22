export interface Project {
  slug: string;
  title: string;
  summary: string;
  techStack: string[];
  thumbnail: {
    src: string;
    alt: string;
  };
  period: string;
  featured?: boolean;
}
