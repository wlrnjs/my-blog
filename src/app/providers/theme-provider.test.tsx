import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import { ThemeProvider } from "./theme-provider";

describe("ThemeProvider", () => {
  it("자식 요소(children)가 올바르게 렌더링되어야 한다", () => {
    render(
      <ThemeProvider>
        <div data-testid="child-element">테스트 자식 요소</div>
      </ThemeProvider>
    );

    expect(screen.getByTestId("child-element")).toBeInTheDocument();
    expect(screen.getByText("테스트 자식 요소")).toBeInTheDocument();
  });
});
