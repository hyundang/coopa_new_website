import { DefaultTheme, css, CSSProp } from "styled-components";

const sizes: { [key: string]: number } = {
  desktop_2: 1919,
  desktop_3: 1599,
  desktop_4: 1365,
  tablet: 1023,
  mobile: 599,
};

type BackQuoteArgs = string[];

interface Media {
  mobile: (...args: BackQuoteArgs) => CSSProp | undefined;
  tablet: (...args: BackQuoteArgs) => CSSProp | undefined;
  desktop_2: (...args: BackQuoteArgs) => CSSProp | undefined;
  desktop_3: (...args: BackQuoteArgs) => CSSProp | undefined;
  desktop_4: (...args: BackQuoteArgs) => CSSProp | undefined;
}

const media: Media = {
  mobile: () => undefined,
  tablet: () => undefined,
  desktop_2: () => undefined,
  desktop_3: () => undefined,
  desktop_4: () => undefined,
};

const theme: DefaultTheme = {
  media: Object.keys(sizes).reduce((acc: Media, label: string) => {
    if (
      label === "desktop_2" ||
      label === "desktop_3" ||
      label === "desktop_4" ||
      label === "tablet" ||
      label === "mobile"
    ) {
      acc[label] = (...args) => css`
        @media (max-width: ${sizes[label]}px) {
          ${args};
        }
      `;
    }
    return acc;
  }, media),
};

export { theme };
