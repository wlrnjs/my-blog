import type { MetadataRoute } from "next";
import { getAllPosts } from "@/entities/post/api";
import { PostSummary } from "@/shared/supabase/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.wlrnjs.xyz";

  const now = new Date();

  let posts: PostSummary[] = [];
  try {
    posts = await getAllPosts();
  } catch (error) {
    console.error("sitemap 생성을 위한 포스트 목록 조회 실패:", error);
    // 실패하더라도 빈 배열로 폴백하여 정적 페이지들은 sitemap에 포함되도록 함
  }

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(post.published_at),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/tags`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...postUrls,
  ];
}
