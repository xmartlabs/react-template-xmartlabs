import { generatePath } from "react-router";
import { routes } from "./routes";
import type { Params, RouteName } from "./routes";

const buildQueryParams = (params: Params) => {
  const queryString = new URLSearchParams(params).toString();
  return queryString.length ? `?${queryString}` : "";
};

/*
  Given a name, finds the route in the configuration that has that name.
  Throws an exception if it doesn't exist. This is done this way since it
  doesn't make sense to try to find a route that doesn't exist.
*/
const findRoute = (routeName: RouteName) => {
  const route = routes.find((routeData) => routeData.name === routeName);
  if (!route) {
    throw new Error(
      `Route name sent does not match any route. Route was '${routeName}'`,
    );
  }
  return route;
};

/*
  Given a name, path parameters and query parameters, crafts and returns the
  route path with those parameters.
*/
const getRouteFor = (
  routeName: RouteName,
  pathParams: Params = {},
  queryParams: Params = {},
) => {
  const route = findRoute(routeName);

  // Replace pathParams
  const interpolatedPath = generatePath(route.path, pathParams);

  // Inject queryParams
  const urlQueryParams = buildQueryParams(queryParams);
  return `${interpolatedPath}${urlQueryParams}`;
};

export { findRoute, getRouteFor };
