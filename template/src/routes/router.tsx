import React from 'react';
import { Route, Router as VendorRouter, Switch } from 'react-router-dom';
import { ScrollToTop } from './scroll-to-top';
import { history } from './utils';
import type { Route as RouteType } from './utils';
import { RouteComponent } from './route-component';

type RouterProps = {
  routes: RouteType[],
};

const renderRoutes = (routeData: RouteType[]) => (
  routeData.map((data) => (
    <Route
      key={data.path}
      exact={data.exact}
      path={data.path}
      component={RouteComponent[data.name]}
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
