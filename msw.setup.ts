import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("*/rest/v1/posts*", () => {
    return HttpResponse.json([
      {
        id: "1",
        slug: "test-post",
        title: "테스트 포스트",
        description: "테스트 포스트 설명입니다.",
        published_at: new Date().toISOString(),
      },
    ]);
  }),
  http.get("*/rest/v1/tags_with_post_count*", () => {
    return HttpResponse.json([
      {
        id: "1",
        name: "React",
        slug: "react",
        description: "React 태그",
        post_count: 5,
      },
    ]);
  }),
];

export const server = setupServer(...handlers);
