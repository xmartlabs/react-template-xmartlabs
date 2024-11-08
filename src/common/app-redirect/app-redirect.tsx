import { useEffect } from "react";
import { useGoToPage } from "hooks/use-go-to-page";

import type { Params, RouteName } from "../../routes/routes";

/*
  This component is a wrapper for redirecting across and inside apps.

  AppRedirect is simple a component wrapper for goToPage() behaviour. It simply
  renders nothing and calls that function on componentDidMount().

  NOTE: this component is only useful for routing inside the apps
  defined in this project. To link outside, use <a></a> tags as usual.
*/

interface AppRedirectProps<R extends RouteName> {
  pathParams?: Params;
  queryParams?: Params;
  routeName: R;
}

const defaultProps = {
  pathParams: {},
  queryParams: {},
};

const AppRedirect = <R extends RouteName>(props: AppRedirectProps<R>) => {
  const goToPage = useGoToPage();
  useEffect(() => {
    goToPage(props.routeName, props.pathParams, props.queryParams);
  }, [goToPage, props.pathParams, props.queryParams, props.routeName]);

  return null;
};

AppRedirect.defaultProps = defaultProps;

export { AppRedirect };
