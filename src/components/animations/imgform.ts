import { css, keyframes } from "styled-components";

const rotate = keyframes`
    100%{transform: rotate(360deg);}
`;
const rotateRule = css(
  ["", " 1.2s ease-in-out infinite"] as any as TemplateStringsArray,
  rotate,
);

const imgformAnimation = {
  rotateRule,
};

export default imgformAnimation;
