import { css, keyframes } from "styled-components";

/* stylelint-disable */
const homeboardFadeIn = keyframes`
    from {
      // 위에서 내려오도록
      transform: translate(0, -5px);
      opacity: 0;
    }
    to {
      transform: translate(0, 0);
      opacity: 1;
    }
`;
// EQUIVALENT TO: css`${fadeIn} 0.4s linear;`
export const homeboardFadeInRule = css(
  ["", " 0.4s linear;"] as any as TemplateStringsArray,
  homeboardFadeIn,
);

const homeboardFadeOut = keyframes`
    from {
      transform: translate(0, 0);
      opacity: 1;
    }
    to {
      // 위로 올라가도록
      transform: translate(0, -5px);
      opacity: 0;
    }
`;
export const homeboardFadeOutRule = css(
  ["", " 0.4s linear;"] as any as TemplateStringsArray,
  homeboardFadeOut,
);

const tabletFadeIn = keyframes`
  from {
    transform: translate(-50%,0);
    opacity: 0;
  }
  to {
    transform: translate(-50%,-100%);
    opacity: 1;
  }
`;
export const tabletFadeInRule = css(
  ["", " 0.3s linear;"] as any as TemplateStringsArray,
  tabletFadeIn,
);

const tabletFadeOut = keyframes`
  from {
    transform: translate(-50%,-100%);
    opacity: 1;
  }
  to {
    transform: translate(-50%,0);
    opacity: 0;
  }
`;
export const tabletFadeOutRule = css(
  ["", " 0.3s linear;"] as any as TemplateStringsArray,
  tabletFadeOut,
);
/* stylelint-enable */
