import "axios";

declare module "*.mdx";

declare const DOMAIN: string;
declare const HTTP_ONLY: string;
declare const API_DOMAIN: string;
declare const COOKIE_PAGE_SIZE: number;
declare const VERSION: string;

declare module "axios" {
  export interface AxiosRequestConfig {
    responseEncoding?: string;
  }
}
