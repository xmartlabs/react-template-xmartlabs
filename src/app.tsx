import { createRouter, routes } from "routes";
import { ErrorBoundary } from "common/error-boundary";
import { RouterProvider } from "react-router-dom";

const router = createRouter(routes);

const App = () => (
  <ErrorBoundary>
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  </ErrorBoundary>
);

export { App };
