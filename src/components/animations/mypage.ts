import { css, keyframes } from "styled-components";

const countDuribunHead = keyframes`
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0px);
      opacity: 1;
    }
`;
const countDuribunHeadRule = css(
  ["", " 0.3s ease-out"] as any as TemplateStringsArray,
  countDuribunHead,
);

const countDuribunHand = keyframes`
    0% {
      transform: translateY(-5px);
      opacity: 0;
    }
    90% {
      transform: translateY(-5px);
      opacity: 0;
    }
    100% {
      transform: translateY(0px);
      opacity: 1;
    }
`;
const countDuribunHandRule = css(
  ["", " 0.65s ease-in"] as any as TemplateStringsArray,
  countDuribunHand,
);

const bubbleFadeIn = keyframes`
    from {
      transform: translate(-102px, 3px);
      opacity: 0;
    }
    to {
      transform: translate(-102px, 0px);
      opacity: 1;
    }
`;
const bubbleFadeInRule = css(
  ["", " 0.2s ease-out"] as any as TemplateStringsArray,
  bubbleFadeIn,
);

const bubbleFadeOut = keyframes`
    from {
      transform: translate(-102px, 0px);
      opacity: 1;
      visibility: visible;
    }
    to {
      transform: translate(-102px, 3px);
      opacity: 0;
      visibility: hidden;
    }
`;
const bubbleFadeOutRule = css(
  ["", " 0.2s ease-out"] as any as TemplateStringsArray,
  bubbleFadeOut,
);

const logoutDuribunFadeIn = keyframes`
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0px);
      opacity: 1;
    }
`;
const logoutDuribunFadeInRule = css(
  ["", " 0.3s ease-out"] as any as TemplateStringsArray,
  logoutDuribunFadeIn,
);

const logoutDuribunFadeOut = keyframes`
    from {
      transform: translateY(0px);
      opacity: 1;
      visibility: visible;
    }
    to {
      transform: translateY(50px);
      opacity: 0;
      visibility: hidden;
    }
`;
const logoutDuribunFadeOutRule = css(
  ["", " 0.3s ease-out"] as any as TemplateStringsArray,
  logoutDuribunFadeOut,
);

export default {
  countDuribunHeadRule,
  countDuribunHandRule,
  bubbleFadeInRule,
  bubbleFadeOutRule,
  logoutDuribunFadeInRule,
  logoutDuribunFadeOutRule,
};
