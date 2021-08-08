import { css, keyframes } from "styled-components";

const TileHover = keyframes`
  from {
    transform: translate(0,10px);
  }
  to {
    transform: translate(0,0);
  }
`;

const TileHoverRule = css(
  ["", " 0.3s"] as any as TemplateStringsArray,
  TileHover,
);

const bookmarkAnimation = {
  TileHoverRule,
};
export default bookmarkAnimation;
