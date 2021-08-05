import { css, keyframes } from "styled-components";

// 위에서 내려오도록
const homeboardFadeIn = keyframes`
    from {
      transform: translate(0, -5px);
      opacity: 0;
    }
    to {
      transform: translate(0, 0);
      opacity: 1;
    }
`;
// ${homeboardFadeIn} 0.4s linear 이랑 같음
const homeboardFadeInRule = css(
  ["", " 0.4s linear"] as any as TemplateStringsArray,
  homeboardFadeIn,
);

// 위로 올라가도록
const homeboardFadeOut = keyframes`
    from {
      transform: translate(0, 0);
      opacity: 1;
    }
    to {
      transform: translate(0, -5px);
      opacity: 0;
    }
`;
const homeboardFadeOutRule = css(
  ["", " 0.4s linear"] as any as TemplateStringsArray,
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
const tabletFadeInRule = css(
  ["", " 0.4s linear"] as any as TemplateStringsArray,
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
const tabletFadeOutRule = css(
  ["", " 0.4s linear"] as any as TemplateStringsArray,
  tabletFadeOut,
);

const modalAnimation = {
  homeboardFadeInRule,
  homeboardFadeOutRule,
  tabletFadeInRule,
  tabletFadeOutRule,
};

export default modalAnimation;
