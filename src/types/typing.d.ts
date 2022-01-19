import "axios";

declare module "*.mdx";

declare module "axios" {
  export interface AxiosRequestConfig {
    responseEncoding?: string;
  }
}
