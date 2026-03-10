## 2025-03-10 - [Parallelize Independent Async Data Fetching in Next.js Server Components]
**Learning:** For Next.js `force-dynamic` server components, independent async data fetching operations (such as Supabase queries) should be parallelized using `Promise.all` to prevent sequential fetching and minimize Time To First Byte (TTFB).
**Action:** Always identify independent async calls and group them with `Promise.all` in server components.
