import { describe, it, expect, mock, beforeEach } from "bun:test";
import { getPostsByTagSlug } from "./getPostsByTagSlug";

// Mock Supabase
const mockRange = mock(() => ({
  data: [],
  error: null,
  count: 0,
}));

const mockOrder = mock(() => ({
  range: mockRange,
}));

const mockEq2 = mock(() => ({
  order: mockOrder,
}));

const mockEq1 = mock(() => ({
  eq: mockEq2,
}));

const mockSelect = mock(() => ({
  eq: mockEq1,
}));

const mockFrom = mock(() => ({
  select: mockSelect,
}));

mock.module("@/shared/supabase/supabase", () => ({
  supabase: {
    from: mockFrom,
  },
}));

describe("getPostsByTagSlug", () => {
  beforeEach(() => {
    mockRange.mockClear();
    mockOrder.mockClear();
    mockEq2.mockClear();
    mockEq1.mockClear();
    mockSelect.mockClear();
    mockFrom.mockClear();
  });

  it("기본 파라미터가 적용될 때 올바른 범위로 데이터를 요청해야 합니다.", async () => {
    await getPostsByTagSlug({ tagSlug: "test-tag" });

    // 기본 page = 1, limit = 10 이므로 0부터 9까지 요청
    expect(mockRange).toHaveBeenCalledWith(0, 9);
  });

  it("page와 limit이 주어졌을 때 올바른 범위로 데이터를 요청해야 합니다.", async () => {
    await getPostsByTagSlug({ tagSlug: "test-tag", page: 3, limit: 5 });

    // page = 3, limit = 5 이므로 10부터 14까지 요청
    expect(mockRange).toHaveBeenCalledWith(10, 14);
  });

  it("음수 또는 0인 page 값이 주어졌을 때 1페이지로 처리해야 합니다.", async () => {
    await getPostsByTagSlug({ tagSlug: "test-tag", page: -5, limit: 10 });

    // page가 -5여도 1페이지로 처리되므로 0부터 9까지 요청
    expect(mockRange).toHaveBeenCalledWith(0, 9);

    await getPostsByTagSlug({ tagSlug: "test-tag", page: 0, limit: 10 });

    // page가 0이어도 1페이지로 처리되므로 0부터 9까지 요청
    expect(mockRange).toHaveBeenCalledWith(0, 9);
  });

  it("limit이 100을 초과할 때 최대 제한치인 100으로 처리해야 합니다.", async () => {
    await getPostsByTagSlug({ tagSlug: "test-tag", page: 1, limit: 1000 });

    // limit이 1000이어도 100으로 처리되므로 0부터 99까지 요청
    expect(mockRange).toHaveBeenCalledWith(0, 99);
  });
});
