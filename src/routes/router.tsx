import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import type { Route as RouteType } from "./routes";
import { RouteComponent } from "./route-component";
import { RouteLayout } from "./route-layout";
import { RouterErrorBoundary } from "./router-error-boundary";

const createRoutes = (routeData: RouteType[]): RouteObject[] => [
  {
    Component: RouteLayout,
    ErrorBoundary: RouterErrorBoundary,
    children: routeData.map((data) => ({
      ...data,
      Component: RouteComponent[data.name],
    })),
  },
];

export const createRouter = (routes: RouteType[]) =>
  createBrowserRouter(createRoutes(routes), {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  });
