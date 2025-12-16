import { createRouter, routes } from "routes";
import { ErrorBoundary } from "common/error-boundary";
import { RouterProvider } from "react-router/dom";
import { HelmetProvider } from "@vuer-ai/react-helmet-async";

const router = createRouter(routes);

const App = () => (
  <HelmetProvider>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </HelmetProvider>
);

export { App };
