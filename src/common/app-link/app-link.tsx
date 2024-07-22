import React from "react";
import { Link } from "react-router-dom";
import { getRouteFor } from "../../routes/route-helpers";
import type { Params, RouteName } from "../../routes/routes";

/*
  This component is a wrapper for linking across and inside apps.

  AppLink automatically detects if the route passed is inside or outside the
  current app, and creates a Link or <a> tag according to the case.

  NOTE: this component is only useful for routing inside the apps
  defined in this project. To link outside, use <a></a> tags as usual.
*/

type Route = {
  pathParams?: Params;
  queryParams?: Params;
  routeName: RouteName;
};

// Extract pathParams from the routeName
type AppLinkProps = {
  children: React.ReactNode;
  className?: string;
  route: Route;
  targetBlank?: boolean;
  replace?: boolean;
  preventScrollReset?: boolean;
  state?: any;
  reloadDocument?: boolean;
};

const defaultProps = {
  className: "",
  targetBlank: false,
  replace: false,
  preventScrollReset: false,
  reloadDocument: false,
};

const AppLink = (props: AppLinkProps) => {
  const { routeName, pathParams, queryParams } = props.route;
  const routePath = getRouteFor(routeName, pathParams, queryParams);
  let targetBlankProps = {};
  if (props.targetBlank) {
    targetBlankProps = {
      target: "_blank",
      rel: "noopener noreferrer",
    };
  }
  return (
    <Link
      className={props.className}
      to={routePath}
      replace={props.replace}
      preventScrollReset={props.preventScrollReset}
      state={props.state}
      reloadDocument={props.reloadDocument}
      {...targetBlankProps}
    >
      {props.children}
    </Link>
  );
};

AppLink.defaultProps = defaultProps;

export { AppLink };
