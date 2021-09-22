import React from 'react';

import { Layout, LayoutType } from './layout';

const withLayout = <TOriginalProps extends {}>(
  layoutType: LayoutType,
  Component: React.ComponentType<TOriginalProps>,
) => (
    (props: TOriginalProps) => (
      <Layout layoutType={layoutType}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...props} />
      </Layout>
    )
  );

export { withLayout };
