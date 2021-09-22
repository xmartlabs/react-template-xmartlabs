import { RouteName } from 'routes/routes';
import { Home } from 'pages/home';
import { NotFound } from 'pages/not-found';

const routeConfig = [
  {
    name: RouteName.Home,
    component: Home,
  },
  {
    name: RouteName.NotFound,
    component: NotFound,
  },
];

export { routeConfig };
