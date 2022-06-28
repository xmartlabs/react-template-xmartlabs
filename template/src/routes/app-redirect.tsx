import React, { useEffect } from 'react';

import { goToPage, Params } from './route-helpers';
import { RouteName } from './routes';

/*
  This component is a wrapper for redirecting across and inside apps.

  AppRedirect is simple a component wrapper for goToPage() behaviour. It simply
  renders nothing and calls that function on componentDidMount().

  NOTE: this component is only useful for routing inside the apps
  defined in this project. To link outside, use <a></a> tags as usual.
*/

type AppRedirectProps = {
  pathParams?: Params,
  queryParams?: Params,
  routeName: RouteName,
};

const defaultProps = {
  pathParams: {},
  queryParams: {},
};

const AppRedirect : React.FC<AppRedirectProps> = (props) => {
  useEffect(() => {
    goToPage(props.routeName, props.pathParams, props.queryParams);
  }, []);

  return null;
};

AppRedirect.defaultProps = defaultProps;

export { AppRedirect };
