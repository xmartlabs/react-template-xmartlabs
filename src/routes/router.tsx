import { createBrowserRouter } from "react-router";
import type { RouteObject } from "react-router";
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
  createBrowserRouter(createRoutes(routes));
