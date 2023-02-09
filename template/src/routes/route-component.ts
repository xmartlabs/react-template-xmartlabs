import { Home } from 'pages/home';
import { About } from 'pages/about';
import { NotFound } from 'pages/not-found';
import { RouteName } from './utils';

const RouteComponent = new Map(
  [
    [
      RouteName.Home,
      Home,
    ],
    [
      RouteName.About,
      About,
    ],
    [
      RouteName.NotFound,
      NotFound,
    ],
  ],
);

export { RouteComponent };
