export type Params = Record<string, string>;

export enum RouteName {
  Home = "home",
  About = "about",
  Login = "login",
  NotFound = "notFound",
}

export interface Route {
  name: RouteName;
  path: string;
  exact?: boolean;
  pathParams?: Params;
  component?: React.ComponentType;
}

const PATH_PARAM_REGEX = /:[^/?]+/gi;
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
  const pathMatch = path.match(PATH_PARAM_REGEX) ?? [];
  const pathParams: Record<string, string> = {};
  pathMatch.forEach((param) => {
    const paramName = param.slice(1);
    pathParams[paramName] = "";
  });
  newRoute.pathParams = pathParams;
  return newRoute;
};

export { setPathParams };

const ROUTES = [
  {
    name: RouteName.Home,
    path: "/",
    exact: true,
  },
  {
    name: RouteName.About,
    path: "/about",
    exact: true,
  },
  {
    name: RouteName.Login,
    path: "/login",
    exact: true,
  },
  {
    name: RouteName.NotFound,
    path: "*",
  },
] as const;

/*
 * This type is used to extract the type of the route params
 * from the path string.
 */
export type RouteParams = Record<RouteName, Route> & Params;

export const routes = ROUTES.map(setPathParams);
