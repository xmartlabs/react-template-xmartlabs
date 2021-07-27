import { routeNaming } from 'routes/routes';
import { Home } from 'pages/home';
import { NotFound } from 'pages/not-found';
import { RickAndMorty } from './pages/test-example/rick-and-morty';
import { RickAndMortyForm } from './pages/test-example/rick-and-morty-form';

const routeConfig = [
  {
    name: routeNaming.HOME,
    component: Home,
  },
  {
    name: routeNaming.RICK_AND_MORTY,
    component: RickAndMorty,
  },
  {
    name: routeNaming.RICK_AND_MORTY_FORM,
    component: RickAndMortyForm,
  },
  {
    name: routeNaming.NOT_FOUND,
    component: NotFound,
  },
];

export { routeConfig };
