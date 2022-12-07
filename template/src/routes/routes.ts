/* eslint-disable @typescript-eslint/no-shadow */
import { Home } from 'pages/home';
import { About } from 'pages/about';
import { NotFound } from 'pages/not-found';
import { Route, setPathParams } from './utils';

export enum RouteName {
  Home = 'home',
  About = 'about',
  NotFound = 'notFound',
}

export const routes: Route[] = [
  {
    name: RouteName.Home,
    path: '/',
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
].map(setPathParams);
