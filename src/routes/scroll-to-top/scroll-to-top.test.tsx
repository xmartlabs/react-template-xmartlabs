import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BrowserRouter, Link, Route, Routes } from "react-router";
import { mockScrollTo } from "tests/support/window-mock";
import { ScrollToTop } from "./scroll-to-top";

describe("ScrollToTop", () => {
  const setupTest = (children = <p>Children</p>) =>
    render(
      <BrowserRouter>
        <ScrollToTop>{children}</ScrollToTop>
      </BrowserRouter>,
    );
  describe("when rendering", () => {
    it("renders correctly", () => {
      expect(setupTest).not.toThrow();
    });

    it("renders its children correctly", () => {
      const children = <p>Other Children</p>;
      setupTest(children);

      expect(() => screen.getByText("Other Children")).not.toThrow();
    });

    it("does not call window.scrollTo", () => {
      expect(mockScrollTo).not.toHaveBeenCalled();
    });
  });

  describe("when updating", () => {
    it("calls window.scrollTo", () => {
      const MockComponent = () => <div>Mock Component</div>;
      const TestComponent = () => (
        <>
          <Link to="/new-page">New Page</Link>
          <Routes>
            <Route path="/" element={<MockComponent />} />
            <Route path="/new-page" element={<div>New Page</div>} />
          </Routes>
        </>
      );
      // Render ScrollToTop with the test component
      render(
        <BrowserRouter>
          <ScrollToTop>
            <TestComponent />
          </ScrollToTop>
        </BrowserRouter>,
      );
      // Simulate a click on the link that triggers a redirect

      fireEvent.click(screen.getByText("New Page"));

      // Verify that window has been scrolled to the top
      expect(window.scrollY).toBe(0);

      // Verify that the new page content is rendered
      expect(mockScrollTo).toHaveBeenCalledTimes(1);
    });
  });
});
