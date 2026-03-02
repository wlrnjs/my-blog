## 2025-03-02 - Intl.DateTimeFormat caching optimization

**Learning:** `new Date(iso).toLocaleDateString("ko-KR", {...})` inside render cycles or mapped arrays can be extremely slow because it instantiates a new formatter on every call. In Next.js Server Components, rendering a large list of posts triggers this formatting for each post.
**Action:** Extract `Intl.DateTimeFormat` into a singleton/cached instance outside the function scope. This reduced formatting time significantly in synthetic benchmarks (~130x faster).

## 2024-05-18 - Over-fetching Supabase Markdown Content

**Learning:** Using `select('*')` or similar wildcards in Supabase queries for lists (like `getPostsByTagSlug`) fetches the entire `content` column, which contains megabytes of markdown. This is a severe backend bottleneck that increases network transfer and Next.js RSC payload size.
**Action:** Always use explicit column selections (e.g. `select('id, slug, title, description, published_at')`) for list views instead of `*` to exclude the `content` field.
## 2024-05-24 - [Parallelize Data Fetching in Force-Dynamic Routes]
**Learning:** `src/app/page.tsx` is explicitly marked as `force-dynamic`, meaning that data is fetched sequentially (waterfall) on every single request. This creates a significant TTFB performance bottleneck for pages with multiple async operations.
**Action:** Use `Promise.all` to fetch independent data concurrently (e.g. `getAllPosts` and `getAllTagsWithCount`) instead of `await`ing them one by one in `force-dynamic` routes to significantly reduce Time To First Byte (TTFB).
