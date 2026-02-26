import { expect, afterEach } from "bun:test";
import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";

expect.extend(matchers as any);

afterEach(() => {
  cleanup();
});
