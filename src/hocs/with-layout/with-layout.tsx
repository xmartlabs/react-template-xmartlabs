import type React from "react";

import type { LayoutType } from "./layout";
import { Layout } from "./layout";

const withLayout = <TOriginalProps extends object>(
  layoutType: LayoutType,
  Component: React.ComponentType<TOriginalProps>,
) => {
  // NOTE: we give a name to the component for debugging purposes.
  const LayoutComponent = (props: TOriginalProps) => (
    <Layout layoutType={layoutType}>
      <Component {...props} />
    </Layout>
  );
  return LayoutComponent;
};

export { withLayout };
