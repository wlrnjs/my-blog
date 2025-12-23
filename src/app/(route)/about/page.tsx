import { Metadata } from "next";
import { Article } from "@/shared/ui";

export const metadata: Metadata = {
  title: "About",
  description: "About the site",
};

const AboutPage = () => {
  return (
    <Article title="About">
      <p>페이지 공사중...</p>
    </Article>
  );
};

export default AboutPage;
