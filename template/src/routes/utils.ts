import type { RouteName } from './routes';

export type Route = {
  name: RouteName,
  path: string,
  exact?: boolean,
  pathParams?: string[],
  component?: React.ComponentType,
};

const PATH_PARAM_REGEX = /:[^/]+/gi;
/**
  Analyzes the path defined for `route` and
  returns a copy of the route with a new attribute
  `pathParams` which is a list of strings that correspond to the path params.

  @param {object} route - Object that represents a route.

  @return {object} updated route with the new attribute.

  @example

    setPathParams({ name: 'product', path: '/product/:id', component: ProductPage })
*/
const setPathParams = (route: Route): Route => {
  const newRoute = { ...route };
  const { path } = newRoute;
  // Extract the names of the parameters
  const pathMatch = path.match(PATH_PARAM_REGEX) || [];
  const pathParams = pathMatch.map((param) => param.slice(1));
  newRoute.pathParams = pathParams || [];
  return newRoute;
};

export {
  setPathParams,
};
