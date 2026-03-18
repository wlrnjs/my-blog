import type { MetadataRoute } from "next";
import { getAllPosts } from "@/entities/post/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.wlrnjs.xyz";

  const now = new Date();

  let postUrls: MetadataRoute.Sitemap = [];
  try {
    const posts = await getAllPosts();
    postUrls = posts.map((post) => ({
      url: `${baseUrl}/posts/${post.slug}`,
      lastModified: new Date(post.published_at),
      changeFrequency: "monthly",
      priority: 0.8,
    }));
  } catch {
    postUrls = [];
  }

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