import React from 'react';

import { Router } from 'routes';
import { routeConfig } from 'route-components';
import 'index.scss';
import { ErrorBoundary } from 'common/error-boundary';

const App = () => (
  <ErrorBoundary>
    <Router routeConfig={routeConfig} />
  </ErrorBoundary>
);

export { App };
