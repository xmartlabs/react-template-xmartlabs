import React from 'react';

import { Layout } from './layout';

const withLayout = (layoutType, Component) => (
  (props) => (
    <Layout layoutType={layoutType}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...props} />
    </Layout>
  )
);

export { withLayout };
