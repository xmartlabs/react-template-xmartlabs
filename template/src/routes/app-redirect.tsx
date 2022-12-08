import { useEffect } from 'react';

import { goToPage, Params } from './route-helpers';
import type { RouteName, RouteParams } from './routes';

/*
  This component is a wrapper for redirecting across and inside apps.

  AppRedirect is simple a component wrapper for goToPage() behaviour. It simply
  renders nothing and calls that function on componentDidMount().

  NOTE: this component is only useful for routing inside the apps
  defined in this project. To link outside, use <a></a> tags as usual.
*/

type AppRedirectProps<R extends RouteName> = {
  pathParams?: RouteParams[R],
  queryParams?: Params,
  routeName: R,
};

const defaultProps = {
  pathParams: {},
  queryParams: {},
};

const AppRedirect = <R extends RouteName>(props: AppRedirectProps<R>) => {
  useEffect(() => {
    goToPage(props.routeName, props.pathParams, props.queryParams);
  }, []);

  return null;
};

AppRedirect.defaultProps = defaultProps;

export { AppRedirect };
