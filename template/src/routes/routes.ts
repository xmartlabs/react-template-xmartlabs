/* eslint-disable @typescript-eslint/no-shadow */
import { Home } from 'pages/home';
import { About } from 'pages/about';
import { NotFound } from 'pages/not-found';
import type { ExtractRouteParams } from 'react-router';
import type { Params } from './route-helpers';
import { setPathParams } from './utils';

export enum RouteName {
  Home = 'home',
  About = 'about',
  NotFound = 'notFound',
}

const ROUTES = [
  {
    name: RouteName.Home,
    path: '/:page?',
    exact: true,
    component: Home,
  },
  {
    name: RouteName.About,
    path: '/about',
    exact: true,
    component: About,
  },
  {
    name: RouteName.NotFound,
    path: '*',
    component: NotFound,
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
