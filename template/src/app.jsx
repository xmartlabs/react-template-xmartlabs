import React from 'react';

import { Router } from './routes';
import { routeConfig } from './route-components';
import './index.scss';

const App = () => (
  <Router routeConfig={routeConfig} />
);

export { App };
