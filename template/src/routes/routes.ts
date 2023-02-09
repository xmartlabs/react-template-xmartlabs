/* eslint-disable @typescript-eslint/no-shadow */
import type { ExtractRouteParams } from 'react-router';
import { Params, RouteName, setPathParams } from './utils';

const ROUTES = [
  {
    name: RouteName.Home,
    path: '/',
    exact: true,
  },
  {
    name: RouteName.About,
    path: '/about',
    exact: true,
  },
  {
    name: RouteName.NotFound,
    path: '*',
  },
] as const;

/*
* This type is used to extract the type of the route params
* from the path string.
*/
export type RouteParams = {
  [K in RouteName]: ExtractRouteParams<Extract<typeof ROUTES[number], { name: K }>['path']>;
} & Params;

export const routes = ROUTES.map(setPathParams);
