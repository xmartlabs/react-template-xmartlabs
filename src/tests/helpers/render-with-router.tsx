import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router";

export const renderWithRouter = (
  component: JSX.Element,
  { route = "/" } = {},
): ReturnType<typeof render> => {
  window.history.pushState({}, "Test page", route);

  return render(component, { wrapper: BrowserRouter });
};
