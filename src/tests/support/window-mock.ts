import { vi } from "vitest";

export const mockScrollTo = vi.fn();

Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: mockScrollTo,
});
