import { Metadata } from "next";
import { Article } from "@/shared/ui";
import { TagList } from "@/entities/tag/ui";

export const metadata: Metadata = {
  title: "Tags",
  description: "태그별로 글을 탐색합니다.",
  openGraph: {
    title: "Tags",
    description: "태그별로 글을 탐색합니다.",
    url: "/tags",
    images: [
      {
        url: "/metadata/og-tags.png",
        width: 1200,
        height: 630,
        alt: "태그 목록 페이지",
      },
    ],
  },
  alternates: {
    canonical: "/tags",
  },
};

const TagsPage = () => {
  return (
    <Article title="Tags">
      <TagList />
    </Article>
  );
};

export default TagsPage;
