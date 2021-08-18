import { css, keyframes } from "styled-components";

const fadeIn = keyframes`
  0% {
    transform: translate(0,10px);
    opacity: 0;
  }
  10% { 
      opacity: 0;
  }
  100% {
    transform: translate(0,0);
    opacity: 1;
  }
`;

const fadeInRule = css(
  ["", " 0.5s linear"] as any as TemplateStringsArray,
  fadeIn,
);

const duribun = keyframes`
  0% {
    opacity: 0;
  }
  60% {
    opacity: 0;
  }
  90% {
    opacity: 1;
  }
`;
const duribunRule = css(
  ["", " 0.4s linear"] as any as TemplateStringsArray,
  duribun,
);

const cookieimgAnimation = {
  fadeInRule,
  duribunRule,
};

export default cookieimgAnimation;
