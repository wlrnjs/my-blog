import { Metadata } from "next";
import { Article } from "@/shared/ui";
import { ExternalLinks } from "@/widgets";
import { AboutContent } from "@/entities/about/ui";

export const metadata: Metadata = {
  title: "About",
  description: "프론트엔드 개발자로서의 경험과 방향을 정리했습니다.",
  openGraph: {
    title: "About",
    description: "프론트엔드 개발자로서의 경험과 방향을 정리했습니다.",
    url: "/about",
    images: [
      {
        url: "/metadata/og-about.png",
        width: 1200,
        height: 630,
        alt: "About 페이지",
      },
    ],
  },
  alternates: {
    canonical: "/about",
  },
};

const AboutPage = () => {
  return (
    <Article title="About">
      <AboutContent />
      <ExternalLinks />
    </Article>
  );
};

export default AboutPage;
