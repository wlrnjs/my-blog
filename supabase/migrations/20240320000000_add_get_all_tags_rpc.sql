CREATE OR REPLACE FUNCTION get_all_tags()
RETURNS TABLE (tag text)
LANGUAGE sql
STABLE
AS $$
  SELECT DISTINCT unnest(tags) as tag
  FROM posts
  WHERE status = 'published' AND tags IS NOT NULL
  ORDER BY tag;
$$;
