import React from 'react';

import { AppLink } from 'routes/app-link';
import { RouteName } from 'routes/utils';

// TODO: implement this page
const NotFound = () => (
  <div>
    This page does not exist!
    <AppLink routeName={RouteName.Home}>
      Go Home
    </AppLink>
  </div>
);

export { NotFound };
