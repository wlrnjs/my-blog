import { Post, supabase } from "@/shared/supabase/supabase";
import { Tag } from "../model";

/**
 * NOTE:
 * - 이 파일은 post 관련 Supabase 호출을 한 곳에 모아둔 API 레이어입니다.
 * - 프로젝트에 이미 Tag/Category 타입이 있다면 아래 로컬 타입 대신 그 타입을 import 하세요.
 */

export type Category = {
  id: string;
  name: string;
  slug: string;
};

/** 라우팅/SSG용 slug 목록
 *  "slug" 목록만 필요할 때
 *  전체 데이터를 가져오지 않고 라우팅에 필요한 최소만 가져오는 용도.
 */
export async function getPostSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("slug")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching post slugs:", error);
    return [];
  }

  return (data ?? []).map((row) => row.slug).filter(Boolean);
}

/** 태그 목록(태그 테이블 기반)
 *  "태그 목록" 화면/필터가 필요할 때
 *  게시글 리스트 상단 필터 UI(태그 드롭다운/칩) 등
 */
export async function getAllTags(): Promise<Tag[]> {
  const { data, error } = await supabase
    .from("tags")
    .select("id,name,slug")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching tags:", error);
    return [];
  }

  return (data ?? []) as Tag[];
}

/** 카테고리 목록
 * "카테고리 목록" UI가 필요할 때
 * 네비게이션 메뉴 등
 */
export async function getAllCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("id,name,slug")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return (data ?? []) as Category[];
}

/** 태그 slug로 연관 게시글 조회 (post_tags 조인)
 *  "태그 클릭 > 해당 태그 글 목록"
 *  상세 페이지 하단 "관련 글(같은 태그)" (단, 태그 기준 관련 글이면)
 */
export async function getPostsByTagSlug(tagSlug: string): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `*,
      post_tags!inner(
        tag_id,
        tags!inner(slug)
      )`
    )
    .eq("status", "published")
    .eq("post_tags.tags.slug", tagSlug)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts by tag slug:", error);
    return [];
  }

  // select에 join이 포함되어도 posts의 기본 필드는 그대로 들어오므로 Post[]로 캐스팅
  return (data ?? []) as unknown as Post[];
}

/** 카테고리 slug로 연관 게시글 조회 (post_categories 조인)
 *  "카테고리 클릭 > 해당 카테고리 글 목록"
 *  "같은 카테고리의 다른 글" 추천 섹션(관련 글)
 */
export async function getPostsByCategorySlug(categorySlug: string): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `*,
      post_categories!inner(
        category_id,
        categories!inner(slug)
      )`
    )
    .eq("status", "published")
    .eq("post_categories.categories.slug", categorySlug)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts by category slug:", error);
    return [];
  }

  return (data ?? []) as unknown as Post[];
}

/** 제목/설명/콘텐츠 단순 검색(ILIKE)
 *  필요없음
 */
export async function searchPosts(query: string): Promise<Post[]> {
  const q = query.trim();
  if (!q) return [];

  // OR 문법: https://supabase.com/docs/reference/javascript/or
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .or(`title.ilike.%${q}%,description.ilike.%${q}%,content.ilike.%${q}%`)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error searching posts:", error);
    return [];
  }

  return data ?? [];
}

export interface TagWithCount {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  postCount: number;
}

/**
 * 태그 수
 * "태그 수" 필요할 때
 */
export async function getAllTagsWithCount(): Promise<TagWithCount[]> {
  const { data, error } = await supabase
    .from("tags_with_post_count")
    .select("id,name,slug,description,post_count")
    .order("post_count", { ascending: false })
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching tags with count:", error);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? null,
    postCount: Number(row.post_count ?? 0),
  }));
}
