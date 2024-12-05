import type React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ErrorBoundary } from "./error-boundary";

describe("ErrorBoundary", () => {
  describe("when rendered without errors", () => {
    const setupTest = (children: React.ReactNode) => {
      const listenerSpy = vi
        .spyOn(window, "addEventListener")
        .mockImplementation(() => undefined);
      render(<ErrorBoundary>{children}</ErrorBoundary>);

      return {
        listenerSpy,
      };
    };

    it("must render its children", () => {
      const children = "This is a text";
      setupTest(children);

      expect(screen.getByText(children)).toBeTruthy();
    });

    it("must setup an event listener for unhandled rejections", () => {
      const { listenerSpy } = setupTest("Children");

      // NOTE: we're testing that at least one handler has been set for unhandled rejections
      // since it appears that some other code is setting up other handlers as well
      // (probably testing library?)
      expect(
        listenerSpy.mock.calls.some((call) => call[0] === "unhandledrejection"),
      ).toBe(true);
    });

    it("must pass a handler to react to the event", () => {
      const { listenerSpy } = setupTest("Children");

      expect(listenerSpy.mock.calls[0]?.[1]).toBeInstanceOf(Function);
    });
  });
});
