import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// NOTE: Anything imported from routes must avoid the base directory
// since it creates a circular dependency.
import { RouteName, Params } from 'routes/routes';
import { getRouteFor } from 'routes/route-helpers';

export const useGoToPage = () => {
  const navigate = useNavigate();

  return useCallback((routeName: RouteName, pathParams?: Params, queryParams?: Params) => {
    navigate(getRouteFor(routeName, pathParams, queryParams));
  }, [navigate]);
};
