import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export interface Post {
  id: string;
  slug: string;
  title: string;
  description?: string;
  content: string;
  published_at: string;
  updated_at: string;
  status: "draft" | "published";
  author?: string;
  tags?: string[];
  reading_time?: number;
  featured_image?: string;
  meta_title?: string;
  meta_description?: string;
  og_image?: string;
  created_at: string;
  created_by?: string;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  content: string;
  description?: string;
  status: "draft" | "published";
  meta_title?: string;
  meta_description?: string;
  og_image?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  created_at: string;
}

export interface PostCategory {
  post_id: string;
  category_id: string;
}

// Database response types
export interface PostWithCategories extends Post {
  categories?: Category[];
}

export interface SearchResult {
  id: string;
  slug: string;
  title: string;
  description?: string;
  content: string;
  published_at: string;
  author?: string;
  tags?: string[];
  rank: number;
}
