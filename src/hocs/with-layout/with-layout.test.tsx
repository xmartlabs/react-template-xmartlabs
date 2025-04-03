import { screen } from "@testing-library/react";
import { renderWithRouter } from "tests/helpers/render-with-router";
import { describe, expect, it } from "vitest";
import { withLayout } from "./with-layout";
import { LayoutType } from "./layout";

const Component = () => <div>Content</div>;

describe("withLayout", () => {
  describe("when used correctly", () => {
    it("should return a function", () => {
      const WrappedComponent = withLayout(LayoutType.Default, Component);

      expect(typeof WrappedComponent).toBe("function");
    });

    it("should render the children component for LayoutType.Default", () => {
      const WrappedComponent = withLayout(LayoutType.Default, Component);
      renderWithRouter(<WrappedComponent />);

      expect(screen.getByText("Content")).toBeTruthy();
    });

    it("should render the children component for LayoutType.NavAndFooter", () => {
      const WrappedComponent = withLayout(LayoutType.NavAndFooter, Component);
      renderWithRouter(<WrappedComponent />);

      expect(screen.getByText("Content")).toBeTruthy();
    });
    it("should render the children component for LayoutType.Nav", () => {
      const WrappedComponent = withLayout(LayoutType.Nav, Component);
      renderWithRouter(<WrappedComponent />);

      expect(screen.getByText("Content")).toBeTruthy();
    });
  });
});
