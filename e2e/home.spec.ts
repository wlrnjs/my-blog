import { test, expect } from "@playwright/test";

test("메인 페이지가 정상적으로 렌더링된다.", async ({ page }) => {
  // MSW 등 목업 데이터를 설정해서 API 호출(포스트 및 태그 목록)을 우회할 수 있습니다.
  // 여기서는 단순히 Playwright의 route를 사용하여 Supabase API 응답을 목업 처리합니다.
  await page.route("**/rest/v1/posts*", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([
        {
          id: "1",
          slug: "test-post",
          title: "테스트 포스트",
          description: "테스트 포스트 설명입니다.",
          published_at: new Date().toISOString(),
        },
      ]),
    });
  });

  await page.route("**/rest/v1/tags_with_post_count*", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([
        {
          id: "1",
          name: "React",
          slug: "react",
          description: "React 태그",
          post_count: 5,
        },
      ]),
    });
  });

  await page.goto("/");
});
