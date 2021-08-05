import { css, keyframes } from "styled-components";

const fadeInOut = keyframes`
    100% {
      opacity: 0;
      top: 85%;
      -webkit-transform: scale(0.6);
    }
    80% {
      top: 85%;
      -webkit-transform: scale(1);
    }
    75% {
      opacity: 1;
    }
    25% {
      opacity: 1;
      top: 85%;
    }

    17% {
      top: 84.5%;
      opacity: 1;
    }
    0% {
      top: 100vh;
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
      -webkit-transform: scale(0.6);
    }
    80% {
      top: 85%;
      -webkit-transform: scale(1);
    }
    75% {
      opacity: 1;
      top: 85vh;
    }

    58% {
      left: 50%;
    }
    56% {
      left: 49.9%;
    }

    54% {
      left: 50.1%;
    }
    52% {
      left: 49.9%;
    }

    50% {
      left: 50.1%;
    }
    48% {
      left: 49.9%;
    }

    46% {
      left: 50.1%;
    }
    44% {
      left: 49.9%;
    }

    42% {
      left: 50.1%;
    }
    40% {
      left: 50%;
    }

    25% {
      opacity: 1;
      top: 85%;
    }

    17% {
      top: 84.5%;
      opacity: 1;
    }
    0% {
      top: 100%;
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
