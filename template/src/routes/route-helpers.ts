import { ParamsHelper } from 'helpers/params-helper';
import { history, RouteName, routes } from './routes';

export type Params = {
  [key: string]: string | boolean | number | null,
};

/*
  Given a name, finds the route in the configuration that has that name.
  Throws an exception if it doesn't exist. This is done this way since it
  doesn't make sense to try to find a route that doesn't exist.
*/
const findRoute = (routeName: RouteName) => {
  const route = routes.find((routeData) => routeData.name === routeName);
  if (!route) {
    throw new Error(`Route name sent does not match any route. Route was '${routeName}'`);
  }
  return route;
};

/*
  Given a name, path parameters and query parameters, crafts and returns the
  route path with those parameters.
*/
const getRouteFor = (routeName: RouteName, pathParams: Params = {}, queryParams: Params = {}) => {
  const route = findRoute(routeName);

  // Replace pathParams
  let routePath = route.path;
  Object.keys(pathParams).forEach((pathParam) => {
    if (route.pathParams && !route.pathParams.includes(pathParam)) {
      throw new Error(`Route path parameter name does not exist. Route is '${routePath}', and param was '${pathParam}'`);
    }
    routePath = routePath.replace(`:${pathParam}`, String(pathParams[pathParam]));
  });

  // Inject queryParams
  const urlQueryParams = ParamsHelper.createQueryParams(queryParams);
  return `${routePath}${urlQueryParams}`;
};

const goToPage = (routeName: RouteName, pathParams: Params = {}, queryParams: Params = {}) => {
  const routePath = getRouteFor(routeName, pathParams, queryParams);

  history.push(routePath);
};

export {
  findRoute,
  getRouteFor,
  goToPage,
};
