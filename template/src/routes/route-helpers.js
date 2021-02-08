import { ParamsHelper } from 'helpers/params-helper';
import { history, routes } from './routes';

/*
  Given a name, finds the route in the configuration that has that name.
  Throws an exception if it doesn't exist. This is done this way since it
  doesn't make sense to try to find a route that doesn't exist.
*/
const findRoute = (routeName) => {
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
const getRouteFor = (routeName, pathParams = {}, queryParams = {}) => {
  const route = findRoute(routeName);

  // Replace pathParams
  let routePath = route.path;
  Object.keys(pathParams).forEach((pathParam) => {
    if (!route.pathParams.includes(pathParam)) {
      throw new Error(`Route path parameter name does not exist. Route is '${routePath}', and param was '${pathParam}'`);
    }
    routePath = routePath.replace(`:${pathParam}`, pathParams[pathParam]);
  });

  // Inject queryParams
  const urlQueryParams = ParamsHelper.createQueryParams(queryParams);
  return `${routePath}${urlQueryParams}`;
};

const goToPage = (routeName, pathParams = {}, queryParams = {}) => {
  const routePath = getRouteFor(routeName, pathParams, queryParams);

  history.push(routePath);
};

export {
  findRoute,
  getRouteFor,
  goToPage,
};
