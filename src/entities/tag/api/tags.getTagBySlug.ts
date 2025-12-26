import { supabase } from "@/shared/supabase/supabase";

export type TagInfo = {
  slug: string;
  display_name: string | null;
};

export async function getTagBySlug(tagSlug: string): Promise<TagInfo | null> {
  const { data, error } = await supabase
    .from("tags")
    .select("slug, display_name")
    .eq("slug", tagSlug)
    .maybeSingle();

  if (error) {
    console.error("Error fetching tag by slug:", error);
    return null;
  }

  return data;
}
