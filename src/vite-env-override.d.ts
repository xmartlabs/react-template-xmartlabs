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

declare module "*.svg" {
  import type * as React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  > = () => null;

  const src = "";
  export default src;
}

declare module "*.module.css" {
  const classes: Readonly<Record<string, string>> = {};
  export default classes;
}

declare module "*.module.scss" {
  const classes: Readonly<Record<string, string>> = {};
  export default classes;
}

declare module "*.module.sass" {
  const classes: Readonly<Record<string, string>> = {};
  export default classes;
}
