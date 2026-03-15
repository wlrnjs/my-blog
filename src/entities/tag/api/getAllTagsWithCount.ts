import { supabase } from "@/shared/supabase/supabase";
import { TagWithCount } from "../model/types";

interface TagWithCountRow {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  post_count: number | null;
}

export async function getAllTagsWithCount(): Promise<TagWithCount[]> {
  if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
    return [
      {
        id: "1",
        name: "React",
        slug: "react",
        description: "React 태그",
        postCount: 5,
      },
    ];
  }

  const { data, error } = await supabase
    .from("tags_with_post_count")
    .select("id,name,slug,description,post_count")
    .order("post_count", { ascending: false })
    .order("name", { ascending: true });

  if (error) {
    console.error("태그별 포스트 개수 정보를 불러오는 중 오류가 발생했습니다:", error);
    return [];
  }

  const rows = (data ?? []) as unknown as TagWithCountRow[];

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? "",
    postCount: Number(row.post_count ?? 0),
  }));
}
