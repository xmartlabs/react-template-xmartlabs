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

type Route = {
  pathParams?: Params;
  queryParams?: Params;
  routeName: RouteName;
};

type AppRedirectProps = {
  route: Route;
};

const AppRedirect = (props: AppRedirectProps) => {
  const { routeName, pathParams, queryParams } = props.route;
  const goToPage = useGoToPage();
  useEffect(() => {
    goToPage(routeName, pathParams, queryParams);
  }, []);

  return null;
};

export { AppRedirect };
