declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly PUBLIC_URL: string;
  }
}

declare module "*.avif" {
  const src = "";
  export default src;
}

declare module "*.bmp" {
  const src = "";
  export default src;
}

declare module "*.gif" {
  const src = "";
  export default src;
}

declare module "*.jpg" {
  const src = "";
  export default src;
}

declare module "*.jpeg" {
  const src = "";
  export default src;
}

declare module "*.png" {
  const src = "";
  export default src;
}

declare module "*.webp" {
  const src = "";
  export default src;
}

// NOTE: this declaration was copied from https://github.com/pd4d10/vite-plugin-svgr/blob/v4.3.0/client.d.ts.
// It is required since the original declaration is not compatible with how we import SVGs.
// vite-plugin-svgr expects the import to be `"icon.svg?react"` but we import it as `"icon.svg"`.
declare module "*.svg" {
  import type * as React from "react";

  const ReactComponent: React.FunctionComponent<
    React.ComponentProps<"svg"> & {
      title?: string;
      titleId?: string;
      desc?: string;
      descId?: string;
    }
  > = () => null;

  export default ReactComponent;
}

declare module "*.module.css" {
  const classes: Readonly<Record<string, string>> = {};
  export default classes;
}
