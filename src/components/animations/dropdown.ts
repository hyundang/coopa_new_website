import { css, keyframes } from "styled-components";

const fadeOut = keyframes`
  from {
    transform: translate(0,0);
    opacity: 1;
  }
  to {
    transform: translate(0,-4px);
    opacity: 0;
  }
`;
const fadeOutRule = css(
  ["", " 0.3s linear"] as any as TemplateStringsArray,
  fadeOut,
);

const fadeIn = keyframes`
  from {
    transform: translate(0,-4px);
    opacity: 0;
  }
  to {
    transform: translate(0,0);
    opacity: 1;
  }
`;
const fadeInRule = css(
  ["", " 0.3s linear"] as any as TemplateStringsArray,
  fadeIn,
);

const dropdownAnimation = {
  fadeInRule,
  fadeOutRule,
};

export default dropdownAnimation;
