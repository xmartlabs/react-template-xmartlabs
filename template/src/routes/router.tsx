import React from 'react';
import { Route, Router as VendorRouter, Switch } from 'react-router-dom';

import { history, RouteName, routes } from './routes';
import { ScrollToTop } from './scroll-to-top';

type RouteConfig = {
  name: RouteName,
  component: React.ComponentType,
};

type RouterProps = {
  routeConfig: RouteConfig[],
};

const zipRouteData = (routeData: RouteConfig[]) => (
  routeData.map((data) => {
    const route = routes.find((r) => r.name === data.name);
    return {
      ...data,
      ...route,
    };
  })
);

const renderRoutes = (routeData: RouteConfig[]) => (
  zipRouteData(routeData).map((data) => (
    <Route
      key={data.path}
      exact
      path={data.path}
      component={data.component}
    />
  ))
);

const Router = (props: RouterProps) => (
  <VendorRouter history={history}>
    <ScrollToTop>
      <Switch>
        {renderRoutes(props.routeConfig)}
      </Switch>
    </ScrollToTop>
  </VendorRouter>
);

export { Router };
