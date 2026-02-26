import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import PostItem from "./PostItem";
import { Post } from "@/shared/supabase/supabase";
import { formatDateKoreanYMD } from "@/shared/lib";

const mockPost: Post = {
  id: "test-id",
  slug: "test-slug",
  title: "Test Post Title",
  description: "Test post description",
  content: "Test post content",
  published_at: "2023-01-01T00:00:00Z",
  updated_at: "2023-01-02T00:00:00Z",
  status: "published",
  created_at: "2023-01-01T00:00:00Z",
};

describe("PostItem", () => {
  it("게시물 정보가 올바르게 렌더링되어야 한다", () => {
    render(<PostItem post={mockPost} />);

    // 제목 확인
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();

    // 설명 확인
    expect(screen.getByText(mockPost.description!)).toBeInTheDocument();

    // 날짜 확인
    const expectedDate = formatDateKoreanYMD(mockPost.published_at);
    expect(screen.getByText(expectedDate)).toBeInTheDocument();

    // 링크 확인
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/posts/${mockPost.slug}`);
  });

  it("설명이 없는 경우에도 올바르게 렌더링되어야 한다", () => {
    const postWithoutDesc: Post = {
      ...mockPost,
      description: undefined,
    };
    render(<PostItem post={postWithoutDesc} />);

    expect(screen.getByText(postWithoutDesc.title)).toBeInTheDocument();

    // 설명이 렌더링되지 않아야 함
    expect(screen.queryByText("Test post description")).not.toBeInTheDocument();
  });
});
