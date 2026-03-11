
## 2025-02-17 - [Next.js `force-dynamic` Parallel Data Fetching]
**Learning:** In Next.js `force-dynamic` server components, independent async operations (like Supabase database queries) that are awaited sequentially block rendering completely until all data is fetched, leading to unnecessarily high Time To First Byte (TTFB).
**Action:** Always identify independent async operations in `force-dynamic` routes and wrap them in `Promise.all` to fetch them concurrently, ensuring the server responds as fast as the slowest single query rather than the sum of all queries.
