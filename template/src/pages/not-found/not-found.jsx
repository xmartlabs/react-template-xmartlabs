import React from 'react';

import { AppLink, routeNaming } from 'routes';

// TODO: implement this page
const NotFound = () => (
  <div>
    This page does not exist!
    <AppLink routeName={routeNaming.HOME}>
      Go Home
    </AppLink>
  </div>
);

export { NotFound };
