import React from 'react';
import { Link } from 'react-router-dom';

import { getRouteFor, Params } from './route-helpers';
import { RouteName } from './routes';

/*
  This component is a wrapper for linking across and inside apps.

  AppLink automatically detects if the route passed is inside or outside the
  current app, and creates a Link or <a> tag according to the case.

  NOTE: this component is only useful for routing inside the apps
  defined in this project. To link outside, use <a></a> tags as usual.
*/

type AppLinkProps = {
  children: React.ReactNode,
  className?: string,
  pathParams?: Params,
  queryParams?: Params,
  routeName: RouteName,
  targetBlank?: boolean,
};

const defaultProps = {
  className: '',
  pathParams: {},
  queryParams: {},
  targetBlank: false,
};

const AppLink = (props: AppLinkProps) => {
  const routePath = getRouteFor(props.routeName, props.pathParams, props.queryParams);
  let targetBlankProps = {};
  if (props.targetBlank) {
    targetBlankProps = {
      target: '_blank',
      rel: 'noopener noreferrer',
    };
  }
  return (
    <Link
      className={props.className}
      to={routePath}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...targetBlankProps}
    >
      {props.children}
    </Link>
  );
};

AppLink.defaultProps = defaultProps;

export { AppLink };
