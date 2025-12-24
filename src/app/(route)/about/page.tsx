import { Metadata } from "next";
import { Article } from "@/shared/ui";
import { ExternalLinks, SnowScript } from "@/widgets";
import { AboutContent } from "@/entities/about/ui";

export const metadata: Metadata = {
  title: "About",
  description: "About the site",
};

const AboutPage = () => {
  return (
    <>
      <SnowScript />

      <Article title="About">
        <AboutContent />
        <ExternalLinks />
      </Article>
    </>
  );
};

export default AboutPage;
