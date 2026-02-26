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
  it("renders post information correctly", () => {
    render(<PostItem post={mockPost} />);

    // Check title
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();

    // Check description
    expect(screen.getByText(mockPost.description!)).toBeInTheDocument();

    // Check date
    const expectedDate = formatDateKoreanYMD(mockPost.published_at);
    expect(screen.getByText(expectedDate)).toBeInTheDocument();

    // Check link
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/posts/${mockPost.slug}`);
  });

  it("renders correctly when description is missing", () => {
    const postWithoutDesc: Post = {
      ...mockPost,
      description: undefined,
    };
    render(<PostItem post={postWithoutDesc} />);

    expect(screen.getByText(postWithoutDesc.title)).toBeInTheDocument();

    // Description should not be rendered (or at least the text shouldn't be found)
    // Note: Since the <p> tag is still rendered, checking for text content might be tricky if we don't know the implementation detail.
    // But we know 'Test post description' should not be present.
    expect(screen.queryByText("Test post description")).not.toBeInTheDocument();
  });
});
