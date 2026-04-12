## 2025-03-02 - Intl.DateTimeFormat caching optimization

**Learning:** `new Date(iso).toLocaleDateString("ko-KR", {...})` inside render cycles or mapped arrays can be extremely slow because it instantiates a new formatter on every call. In Next.js Server Components, rendering a large list of posts triggers this formatting for each post.
**Action:** Extract `Intl.DateTimeFormat` into a singleton/cached instance outside the function scope. This reduced formatting time significantly in synthetic benchmarks (~130x faster).

## 2024-05-18 - Over-fetching Supabase Markdown Content

**Learning:** Using `select('*')` or similar wildcards in Supabase queries for lists (like `getPostsByTagSlug`) fetches the entire `content` column, which contains megabytes of markdown. This is a severe backend bottleneck that increases network transfer and Next.js RSC payload size.
**Action:** Always use explicit column selections (e.g. `select('id, slug, title, description, published_at')`) for list views instead of `*` to exclude the `content` field.
## 2024-05-24 - [Parallelize Data Fetching in Force-Dynamic Routes]
**Learning:** `src/app/page.tsx` is explicitly marked as `force-dynamic`, meaning that data is fetched sequentially (waterfall) on every single request. This creates a significant TTFB performance bottleneck for pages with multiple async operations.
**Action:** Use `Promise.all` to fetch independent data concurrently (e.g. `getAllPosts` and `getAllTagsWithCount`) instead of `await`ing them one by one in `force-dynamic` routes to significantly reduce Time To First Byte (TTFB).

## 2025-03-02 - Next.js Image `priority` anti-pattern on lists
**Learning:** Hardcoding `priority` on Next.js `<Image>` components within mapped arrays or lists defeats the purpose of priority loading by eagerly fetching all images regardless of viewport position. This can increase initial bandwidth usage and severely degrade Largest Contentful Paint (LCP) by competing with critical resources.
**Action:** Always conditionally apply the `priority` prop to list items. Use indicators like `index === 0`, `isFirst`, or a specific data attribute like `featured` to ensure only above-the-fold images are prioritized.
## 2025-03-02 - React cache() for SSR Query Deduplication\n**Learning:** Next.js `fetch` is automatically memoized, but Supabase SDK queries (like `.rpc`) are not. Calling the same query in `generateMetadata` and the Page component runs two database queries per request.\n**Action:** Wrap Supabase data fetching functions with React\u0027s `cache()` to deduplicate identical queries during Server-Side Rendering (SSR).

## 2025-02-13 - Optimize Metadata Data Fetching for Post Detail Pages
**Learning:** For Next.js App Router, using a heavy RPC or query inside `generateMetadata` blocks the stream of the document `<head>`, delaying Time To First Byte (TTFB).
**Action:** Created a lightweight database query `getPostMetadata` that selects only necessary metadata fields (e.g. `meta_title`, `og_image`) without fetching the large `content` field. Wrapping it in React's `cache()` ensures deduplication during SSR.
