## 2025-03-05 - Next.js force-dynamic Data Fetching Optimization
**Learning:** Sequential `await` statements in Next.js `force-dynamic` server components (e.g., `getAllPosts()` followed by `getAllTagsWithCount()`) cause waterfall data fetching, unnecessarily increasing Time To First Byte (TTFB).
**Action:** Always parallelize independent async data fetching operations using `Promise.all` in server components to minimize TTFB and maximize server response speed.
