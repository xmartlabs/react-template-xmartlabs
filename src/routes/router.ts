import {
  createBrowserRouter,
} from 'react-router-dom';
import type { Route as RouteType } from './routes';
import { RouteComponent } from './route-component';
import { RouteLayout } from './route-layout';

const createRoutes = (routeData: RouteType[]) => (
  [
    {
      Component: RouteLayout,
      children: routeData.map((data) => ({
        ...data,
        Component: RouteComponent[data.name],
      })),
    },
  ]
);

export const createRouter = (routes: RouteType[]) => createBrowserRouter(createRoutes(routes));
