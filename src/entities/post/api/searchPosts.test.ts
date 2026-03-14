import { describe, expect, it, mock, afterEach, beforeEach, jest } from "bun:test";

mock.module("@/shared/supabase/supabase", () => {
  return {
    supabase: {
      rpc: mock(() => Promise.resolve({ data: [], error: null })),
    },
  };
});

const { supabase } = await import("@/shared/supabase/supabase");
const { searchPosts } = await import("./searchPosts");

describe("searchPosts 함수 테스트", () => {
  let consoleErrorSpy: ReturnType<typeof jest.spyOn>;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    mock.restore();
    consoleErrorSpy.mockRestore();
  });

  it("빈 쿼리가 주어지면 Supabase 호출 없이 빈 배열을 반환한다", async () => {
    const res = await searchPosts("");
    expect(res).toEqual([]);
    expect(supabase.rpc).not.toHaveBeenCalled();
  });

  it("유효한 쿼리가 주어지면 Supabase rpc를 호출하고 검색 결과를 반환한다", async () => {
    const mockData = [
      {
        id: "1",
        slug: "test-post",
        title: "Test Post",
        description: "Test Description",
        content: "Test Content",
        published_at: "2023-01-01T00:00:00Z",
        author: "author",
        tags: ["tag1"],
        rank: 1,
      },
    ];
    supabase.rpc.mockResolvedValueOnce({ data: mockData, error: null });

    const res = await searchPosts("test");

    expect(supabase.rpc).toHaveBeenCalledWith("search_posts", { query: "test" });
    expect(res).toEqual(mockData);
  });

  it("Supabase rpc 호출 중 오류가 발생하면 빈 배열을 반환하고 에러를 로깅한다", async () => {
    const mockError = new Error("Mock Error");
    supabase.rpc.mockResolvedValueOnce({ data: null, error: mockError });

    const res = await searchPosts("error");

    expect(supabase.rpc).toHaveBeenCalledWith("search_posts", { query: "error" });
    expect(res).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalledWith("포스트 검색 중 오류가 발생했습니다:", mockError);
  });

  it("Supabase rpc 호출 결과 data가 null이면 빈 배열을 반환한다", async () => {
    supabase.rpc.mockResolvedValueOnce({ data: null, error: null });

    const res = await searchPosts("null");

    expect(supabase.rpc).toHaveBeenCalledWith("search_posts", { query: "null" });
    expect(res).toEqual([]);
  });
});
