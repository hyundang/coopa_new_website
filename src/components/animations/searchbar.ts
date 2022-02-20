import { css, keyframes } from "styled-components";

const fadeIn = keyframes`
    from {
      transform: translate(-50%, -25px);
      opacity: 0;
    }
    to {
      transform: translate(-50%, 0);
      opacity: 1;
    }
`;
const fadeInRule = css(
  ["", " 0.3s linear"] as any as TemplateStringsArray,
  fadeIn,
);

const fadeOut = keyframes`
    from {
      transform: translate(-50%, 0);
      opacity: 1;
    }
    to {
      transform: translate(-50%, -25px);
      opacity: 0;
    }
`;
const fadeOutRule = css(
  ["", " 0.3s linear"] as any as TemplateStringsArray,
  fadeOut,
);

const tabletFadeIn = keyframes`
    from {
      transform: translate(0, -25px);
      opacity: 0;
    }
    to {
      transform: translate(0, 0);
      opacity: 1;
    }
`;
const tabletFadeInRule = css(
  ["", " 0.3s linear"] as any as TemplateStringsArray,
  tabletFadeIn,
);

const tabletFadeOut = keyframes`
    from {
      transform: translate(0, 0);
      opacity: 1;
    }
    to {
      transform: translate(0, -25px);
      opacity: 0;
    }
`;
const tabletFadeOutRule = css(
  ["", " 0.3s linear"] as any as TemplateStringsArray,
  tabletFadeOut,
);

const searchbarAnimation = {
  fadeInRule,
  fadeOutRule,
  tabletFadeInRule,
  tabletFadeOutRule,
};

export default searchbarAnimation;
