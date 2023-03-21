import React from 'react';

import { Layout, LayoutType } from './layout';

const withLayout = <TOriginalProps extends {}>(
  layoutType: LayoutType,
  Component: React.ComponentType<TOriginalProps>,
) => (
    (props: TOriginalProps) => (
      <Layout layoutType={layoutType}>
        <Component {...props} />
      </Layout>
    )
  );

export { withLayout };
