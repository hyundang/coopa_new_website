import { css, keyframes } from "styled-components";

const fadeIn = keyframes`
    from {
      transform: translate(0, -25px);
      opacity: 0;
    }
    to {
      transform: translate(0, 0);
      opacity: 1;
    }
`;
const fadeInRule = css(
  ["", " 0.3s linear"] as any as TemplateStringsArray,
  fadeIn,
);

const fadeOut = keyframes`
    from {
      transform: translate(0, 0);
      opacity: 1;
    }
    to {
      transform: translate(0, -25px);
      opacity: 0;
    }
`;
const fadeOutRule = css(
  ["", " 0.3s linear"] as any as TemplateStringsArray,
  fadeOut,
);

const searchbarAnimation = {
  fadeInRule,
  fadeOutRule,
};

export default searchbarAnimation;
