import { render } from "@testing-library/react";
import type React from "react";
import { BrowserRouter } from "react-router";

export const renderWithRouter = (
  component: React.JSX.Element,
  { route = "/" } = {},
): ReturnType<typeof render> => {
  window.history.pushState({}, "Test page", route);

  return render(component, { wrapper: BrowserRouter });
};
