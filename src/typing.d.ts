import "axios";

declare module "*.mdx";

declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;

  const src: string;
  export default src;
}

declare module "*.gif" {
  import * as React from "react";

  const src: string;
  export default src;
}

declare const DOMAIN: string;
declare const HTTP_ONLY: string;
declare const API_DOMAIN: string;

declare module "axios" {
  export interface AxiosRequestConfig {
    responseEncoding?: string;
  }
}
