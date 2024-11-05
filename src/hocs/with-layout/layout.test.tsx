import { describe, expect, it } from "vitest";
import { renderWithRouter } from "tests/helpers/render-with-router";
// import { render } from '@testing-library/react';

import { Layout, LayoutType } from "./layout";

describe("Layout", () => {
  describe("with a correct layout type", () => {
    it("should render correctly", () => {
      const renderMethod = () =>
        renderWithRouter(
          <Layout layoutType={LayoutType.Default}>
            <div>Content</div>
          </Layout>,
        );

      expect(renderMethod).not.toThrow();
    });
  });
});
