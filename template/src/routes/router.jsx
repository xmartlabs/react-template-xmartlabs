import React from 'react';
import { Route, Router as VendorRouter, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { history, routes } from './routes';
import { ScrollToTop } from './scroll-to-top';

const routeConfigTemplate = {
  name: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

const IPropTypes = {
  routeConfig: PropTypes.arrayOf(PropTypes.shape(routeConfigTemplate)).isRequired,
};

const zipRouteData = (routeData) => (
  routeData.map((data) => {
    const route = routes.find((r) => r.name === data.name);
    return {
      ...data,
      ...route,
    };
  })
);

const renderRoutes = (routeData) => (
  zipRouteData(routeData).map((data) => (
    <Route
      key={data.path}
      exact
      path={data.path}
      component={data.component}
    />
  ))
);

const Router = (props) => (
  <VendorRouter history={history}>
    <ScrollToTop>
      <Switch>
        {renderRoutes(props.routeConfig)}
      </Switch>
    </ScrollToTop>
  </VendorRouter>
);

Router.propTypes = IPropTypes;

export { Router };
