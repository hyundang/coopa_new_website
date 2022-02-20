import { css, keyframes } from "styled-components";

const fadeIn = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
`;
const fadeInRule = css(
  ["", " 0.5s linear"] as any as TemplateStringsArray,
  fadeIn,
);

const homeboardAnimation = {
  fadeInRule,
};

export default homeboardAnimation;
