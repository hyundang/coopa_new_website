import { css, keyframes } from "styled-components";

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  50%{
    opacity: 1;
  }
  70%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
`;
const fadeInOutRule = css(
  ["", " 1.5s infinite"] as any as TemplateStringsArray,
  fadeInOut,
);

const cookieimgAnimation = {
  fadeInOutRule,
};

export default cookieimgAnimation;
