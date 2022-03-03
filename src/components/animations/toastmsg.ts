import { css, keyframes } from "styled-components";

const fadeInOut = keyframes`
    100% {
      opacity: 0;
      top: 85%;
      -webkit-transform: scale(0.6), translateX(-50%);
    }
    80% {
      top: 85%;
      -webkit-transform: scale(1),translateX(-50%);
    }
    75% {
      opacity: 1;
      transform: translateX(-50%);
    }
    25% {
      opacity: 1;
      top: 85%;
      transform: translateX(-50%);
    }

    17% {
      top: 84.5%;
      opacity: 1;
      transform: translateX(-50%);
    }
    0% {
      top: 100vh;
      transform: translateX(-50%);
    }
`;
const fadeInOutRule = css(
  ["", " 3.5s"] as any as TemplateStringsArray,
  fadeInOut,
);

const errorFadeInOut = keyframes`
    100% {
      opacity: 0;
      top: 85%;
      -webkit-transform: scale(0.6),translateX(-50%);
    }
    80% {
      top: 85%;
      -webkit-transform: scale(1),translateX(-50%);
    }
    75% {
      opacity: 1;
      top: 85vh;
      transform: translateX(-50%);
    }

    58% {
      left: 50%;
      transform: translateX(-50%);
    }
    56% {
      left: 49.9%;
      transform: translateX(-50%);
    }

    54% {
      left: 50.1%;
      transform: translateX(-50%);
    }
    52% {
      left: 49.9%;
      transform: translateX(-50%);
    }

    50% {
      left: 50.1%;
      transform: translateX(-50%);
    }
    48% {
      left: 49.9%;
      transform: translateX(-50%);
    }

    46% {
      left: 50.1%;
      transform: translateX(-50%);
    }
    44% {
      left: 49.9%;
      transform: translateX(-50%);
    }

    42% {
      left: 50.1%;
      transform: translateX(-50%);
    }
    40% {
      left: 50%;
      transform: translateX(-50%);
    }

    25% {
      opacity: 1;
      top: 85%;
      transform: translateX(-50%);
    }

    17% {
      top: 84.5%;
      opacity: 1;
      transform: translateX(-50%);
    }
    0% {
      top: 100%;
      transform: translateX(-50%);
    }
  `;
const ErrorFadeInOutRule = css(
  ["", " 3.5s"] as any as TemplateStringsArray,
  errorFadeInOut,
);

const toastmsgAnimation = {
  fadeInOutRule,
  ErrorFadeInOutRule,
};

export default toastmsgAnimation;
