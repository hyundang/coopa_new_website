import { DefaultTheme, css, CSSObject } from "styled-components";

const sizes = {
  desktop_1: 1919,
  desktop_2: 1599,
  desktop_3: 1365,
  desktop_4: 1023,
  tablet: 600,
  mobile: 374,
};

const theme: DefaultTheme = {
  colors: {
    orange: "#ff7134",
    orange_hover: "#FF7E33",
    orange_sub: "#F7F0ED",
    gray_1: "#f9f9f9",
    gray_2: "#f3f3f3",
    gray_3: "#dddddd",
    gray_4: "#c2c2c2",
    gray_5: "#999999",
    gray_6: "#777777",
    gray_7: "#555555",
    gray_hover_1: "#f5f3f2",
    gray_hover_2: "#f7f6f5",
    gray_active: "#555352",
    black_1: "#363636",
    black_2: "#242424",
    black_3: "#000000",
    title_strong: "#222222",
    white: "#ffffff",
  },
  boxShadow: {
    orange: "0 0.4rem 1rem rgba(0, 0, 0, 0.25)",
  },
  media: Object.keys(sizes).reduce((acc: any, label: string) => {
    if (
      label === "desktop_1" ||
      label === "desktop_2" ||
      label === "desktop_3" ||
      label === "desktop_4" ||
      label === "tablet" ||
      label === "mobile"
    ) {
      acc[label] = (args: CSSObject | TemplateStringsArray) => css`
        @media (max-width: ${sizes[label]}px) {
          ${css(args)};
        }
      `;
    }
    return acc;
  }, {}),
};

export { theme };
