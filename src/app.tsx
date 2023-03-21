import React from 'react';

import { Router, routes } from 'routes';
import 'index.scss';
import { ErrorBoundary } from 'common/error-boundary';

const App = () => (
  <ErrorBoundary>
    <Router routes={routes} />
  </ErrorBoundary>
);

export { App };
