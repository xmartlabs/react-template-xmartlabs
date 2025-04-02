import type React from "react";
import { Link } from "react-router";
import { getRouteFor } from "../../routes/route-helpers";
import type { Params, RouteName } from "../../routes/routes";

/*
  This component is a wrapper for linking across and inside apps.

  AppLink automatically detects if the route passed is inside or outside the
  current app, and creates a Link or <a> tag according to the case.

  NOTE: this component is only useful for routing inside the apps
  defined in this project. To link outside, use <a></a> tags as usual.
*/

// Extract pathParams from the routeName
interface AppLinkProps<R extends RouteName> {
  children: React.ReactNode;
  className?: string;
  pathParams?: Params;
  queryParams?: Params;
  routeName: R;
  targetBlank?: boolean;
}

const defaultProps = {
  className: "",
  pathParams: {},
  queryParams: {},
  targetBlank: false,
};

const AppLink = <R extends RouteName>(props: AppLinkProps<R>) => {
  const routePath = getRouteFor(
    props.routeName,
    props.pathParams,
    props.queryParams,
  );
  let targetBlankProps = {};
  if (props.targetBlank) {
    targetBlankProps = {
      target: "_blank",
      rel: "noopener noreferrer",
    };
  }
  return (
    <Link className={props.className} to={routePath} {...targetBlankProps}>
      {props.children}
    </Link>
  );
};

AppLink.defaultProps = defaultProps;

export { AppLink };
