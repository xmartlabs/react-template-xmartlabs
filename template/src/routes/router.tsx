import React from 'react';
import { Route, Router as VendorRouter, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { routes } from './routes';
import { ScrollToTop } from './scroll-to-top';

import type { Route as RouteType } from './utils';

const history = createBrowserHistory();

type RouterProps = {
  routes: RouteType[],
};

const zipRouteData = (routeData: RouteType[]) => (
  routeData.map((data) => {
    const route = routes.find((r) => r.name === data.name);
    return {
      ...data,
      ...route,
    };
  })
);

const renderRoutes = (routeData: RouteType[]) => (
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
        {renderRoutes(props.routes)}
      </Switch>
    </ScrollToTop>
  </VendorRouter>
);

export { Router, history };
