import {
  supabase,
  Post,
  SearchResult,
  PostWithCategories,
} from "../../../shared/supabase/supabase";

// Posts API
export async function getAllPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }

  return data || [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) {
    console.error("Error fetching post:", error);
    return null;
  }

  return data;
}

export async function getPostSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("slug")
    .eq("status", "published");

  if (error) {
    console.error("Error fetching post slugs:", error);
    return [];
  }

  return data?.map((post) => post.slug) || [];
}

// Search API
export async function searchPosts(query: string): Promise<SearchResult[]> {
  const { data, error } = await supabase.rpc("search_posts", { query });

  if (error) {
    console.error("Error searching posts:", error);
    return [];
  }

  return data || [];
}

// Posts with categories
export async function getPostsWithCategories(): Promise<PostWithCategories[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      post_categories(
        categories(*)
      )
    `
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts with categories:", error);
    return [];
  }

  // Transform the data to include categories directly
  return (
    data?.map((post) => ({
      ...post,
      categories: post.post_categories?.map((pc: any) => pc.categories) || [],
    })) || []
  );
}

// Get posts by tag
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .contains("tags", [tag])
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts by tag:", error);
    return [];
  }

  return data || [];
}

// Get all unique tags
export async function getAllTags(): Promise<string[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("tags")
    .eq("status", "published")
    .not("tags", "is", null);

  if (error) {
    console.error("Error fetching tags:", error);
    return [];
  }

  // Extract and flatten all tags, then get unique ones
  const allTags = data?.flatMap((post) => post.tags || []) || [];
  return Array.from(new Set(allTags)).sort();
}
