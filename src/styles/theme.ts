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

Object.keys(sizes).reduce((acc: Media, label: string) => {
  switch (label) {
    case "desktop_4":
      acc.desktop_4 = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (max-width: ${sizes.desktop_4}px) {
            ${args}
          }
        `;
      break;
    case "desktop_3":
      acc.desktop_3 = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (max-width: ${sizes.desktop_3}px) {
            ${args}
          }
        `;
      break;
    case "desktop_2":
      acc.desktop_2 = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (max-width: ${sizes.desktop_2}px) {
            ${args}
          }
        `;
      break;
    case "tablet":
      acc.tablet = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (max-width: ${sizes.tablet}px) {
            ${args}
          }
        `;
      break;
    case "mobile":
      acc.mobile = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (max-width: ${sizes.mobile}px) {
            ${args}
          }
        `;
      break;
    default:
      break;
  }
  return acc;
}, media);

const theme: DefaultTheme = {
  media,
};

export { theme };
