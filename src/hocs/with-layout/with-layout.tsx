import type React from "react";

import type { LayoutType } from "./layout";
import { Layout } from "./layout";

const withLayout =
  <TOriginalProps extends {}>(
    layoutType: LayoutType,
    Component: React.ComponentType<TOriginalProps>,
  ) =>
  (props: TOriginalProps) => (
    <Layout layoutType={layoutType}>
      <Component {...props} />
    </Layout>
  );

export { withLayout };
