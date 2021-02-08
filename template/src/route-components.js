import { routeNaming } from 'routes/routes';
import { Home } from 'pages/home';
import { NotFound } from 'pages/not-found';

const routeConfig = [
  {
    name: routeNaming.HOME,
    component: Home,
  },
  {
    name: routeNaming.NOT_FOUND,
    component: NotFound,
  },
];

export { routeConfig };
