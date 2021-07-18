import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      orange: string;
      orange_hover: string;
      orange_sub: string;
      gray_1: string;
      gray_2: string;
      gray_3: string;
      gray_4: string;
      gray_5: string;
      gray_6: string;
      gray_7: string;
      gray_hover_1: string;
      gray_hover_2: string;
      gray_active: string;
      black_1: string;
      black_2: string;
      black_3: string;
      title_strong: string;
      white: string;
    };
    boxShadow: { orange: string };
    media: any;
  }
}
