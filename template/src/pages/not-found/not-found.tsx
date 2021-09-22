import React from 'react';

import { AppLink, RouteName } from 'routes';

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
