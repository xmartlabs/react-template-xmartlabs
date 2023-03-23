import { redirect } from 'react-router-dom';
import { ParamsHelper } from 'helpers/params-helper';
import { routes, Params, RouteName } from './routes';

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
  const routePathParams = route.path.split('/');
  const routePathPms = routePathParams.map((pathParam) => {
    if (pathParam.startsWith(':')) {
      const paramName = pathParam.match(/:[^/?]+/gi)?.[0].slice(1);
      if (!paramName) {
        throw new Error(`Path parameter '${pathParam}' is not valid for route '${routeName}'`);
      }
      return pathParams[paramName] || '';
    }
    return pathParam;
  });

  const routePath = `/${routePathPms.filter((pathParam) => pathParam !== '').join('/')}`;

  // Inject queryParams
  const urlQueryParams = ParamsHelper.createQueryParams(queryParams);
  return `${routePath}${urlQueryParams}`;
};

const goToPage = (routeName: RouteName, pathParams: Params = {}, queryParams: Params = {}) => {
  const routePath = getRouteFor(routeName, pathParams, queryParams);

  redirect(routePath);
};

export {
  findRoute,
  getRouteFor,
  goToPage,
};
