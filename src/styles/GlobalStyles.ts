import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import colorSystems from "./colorSystems";

export const GlobalStyle = createGlobalStyle`
  ${normalize};
  ${colorSystems};
  @import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);

  html,
  body {
    font-family: 'Spoqa Han Sans Neo','sans-serif';
    font-size: 10px;
    letter-spacing: -0.2px;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }

  * {
    box-sizing: border-box;
    font-family: 'Spoqa Han Sans Neo','sans-serif';
  }
`;
