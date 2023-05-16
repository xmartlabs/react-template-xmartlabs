import React from 'react';

import { createRouter, routes } from 'routes';
import 'index.scss';
import { ErrorBoundary } from 'common/error-boundary';
import { RouterProvider } from 'react-router-dom';

const router = createRouter(routes);

const App = () => (
  <ErrorBoundary>
    <RouterProvider router={router} />
  </ErrorBoundary>
);

export { App };
