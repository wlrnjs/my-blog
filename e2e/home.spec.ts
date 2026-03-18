import { test, expect } from "@playwright/test";

test("메인 페이지가 정상적으로 렌더링된다.", async ({ page }) => {
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

  await expect(page.locator("ul").first()).toBeVisible();
  await expect(page.locator("aside")).toBeVisible();
  await expect(page.getByText("테스트 포스트", { exact: true })).toBeVisible();
});