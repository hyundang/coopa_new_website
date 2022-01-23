import styled from "styled-components";
import Fade from "react-reveal/Fade";
import { CookieIcon } from "@assets/icons/common";
import { Landing4Duribun, Landing4Gif } from "@assets/imgs/landing";

export default function LandingFour() {
  return (
    <Container>
      <div className="wrap">
        <main className="content">
          <Fade distance="20px" bottom delay={500} duration={700}>
            <h1 className="content__h1">
              좋은 콘텐츠를
              <br />
              모아 공유
            </h1>
          </Fade>
          <h2 className="content__h2">
            나만의 콘텐츠 파킹랏을
            <br />
            누구에게나 손쉽게 공유해요
          </h2>
          <a
            className="content__link"
            href="https://www.notion.so/56f9b1abddb44f94b9be700863f83ddb"
            target="_blank"
            rel="noreferrer"
          >
            쿠키파킹은 이렇게 탄생했어요
            <CookieIcon className="cookie-icon" />
          </a>
        </main>
        <div className="img">
          <img alt="gif" className="img__gif" src={Landing4Gif} />
          <Fade distance="26px" bottom delay={1100} duration={700}>
            <img alt="duribun" className="img__duribun" src={Landing4Duribun} />
          </Fade>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.section`
  width: 100%;
  height: 780px;
  background-color: rgba(255, 113, 52, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  h1,
  h2 {
    margin: 0;
  }
  a {
    all: unset;
    box-sizing: border-box;
  }

  // wrap
  .wrap {
    display: flex;
    align-items: center;
    position: relative;
    width: 1024px;
    height: 100%;
    margin-left: 40px;
    margin-right: 40px;
    // content
    .content {
      z-index: 5;
      display: flex;
      flex-direction: column;
      &__h1 {
        font-size: 50px;
        font-weight: 700;
        line-height: 75px;
        color: var(--black_3);
      }
      &__h2 {
        margin-top: 30px;
        font-size: 17px;
        font-weight: 400;
        line-height: 26px;
        color: var(--gray_7);
      }
      &__link {
        cursor: pointer;
        display: flex;
        align-items: center;
        margin-top: 22px;
        font-size: 16px;
        font-weight: 500;
        line-height: 30px;
        color: var(--orange);
        .cookie-icon {
          margin-left: 5px;
          width: 14px;
          height: 14px;
          path {
            fill: var(--orange);
          }
        }
      }
    }
    // images
    .img {
      position: absolute;
      right: 0;
      width: 533px;
      height: 377px;
      &__gif {
        position: absolute;
        top: 0;
        left: 0;
        width: 518px;
        height: auto;
      }
      &__duribun {
        position: absolute;
        right: -20px;
        bottom: 0;
        width: 158px;
        height: 158px;
      }
    }
  }
  ${({ theme }) => theme.media.tablet`
    height: 680px;
    .wrap {
      flex-direction: column;
      .content {
        margin-top: 76px;
        text-align: center;
        &__h1 {
          font-size: 28px;
          line-height: 42px;
        }
        &__h2 {
          margin-top: 19px;
          font-size: 14px;
          line-height: 23px;
        }
      }
      .img {
        position: relative;
        max-width: 315px;
        height: 254px;
        margin-top: 28px;
        bottom: 0;
        top: 0;
        
        &__gif {
          width: 316px;
          height: 221px;
          top: 0;
          right: 0;
        }
        &__duribun {
          width: 112px;
          height: auto;
          bottom: 0;
          right:0;
        }
      }
    }
  `}
`;
