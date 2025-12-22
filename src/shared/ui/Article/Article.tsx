import { ReactNode } from "react";

interface ArticleProps {
  children: ReactNode;
  title: string;
  intro: string;
}

const Article = ({ children, title, intro }: ArticleProps) => {
  return (
    <article className="py-6">
      <header className="space-y-3">
        <h1 className="font-bold tracking-tight">{title}</h1>

        <div className="space-y-1">
          <p className="text-xl">{intro}</p>
          <hr />
        </div>
      </header>

      <div className="mt-4">{children}</div>
    </article>
  );
};

export default Article;
