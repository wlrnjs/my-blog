import { ReactNode } from "react";

const Article = ({ children }: { children: ReactNode }) => {
  return <article className="py-6">{children}</article>;
};

export default Article;
