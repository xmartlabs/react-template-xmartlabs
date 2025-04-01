import { useCallback } from "react";
import { useNavigate } from "react-router";

// NOTE: Anything imported from routes must avoid the base directory
// since it creates a circular dependency.
import type { RouteName } from "routes/routes";
import type { Params } from "routes/routes";
import { getRouteFor } from "routes/route-helpers";

export const useGoToPage = () => {
  const navigate = useNavigate();

  return useCallback(
    (routeName: RouteName, pathParams?: Params, queryParams?: Params) => {
      // eslint-disable-next-line no-void
      void navigate(getRouteFor(routeName, pathParams, queryParams));
    },
    [navigate],
  );
};
