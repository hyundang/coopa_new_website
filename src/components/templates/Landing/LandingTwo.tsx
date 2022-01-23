import styled from "styled-components";
import Fade from "react-reveal/Fade";
import { CookieIcon } from "@assets/icons/common";
import { Landing2Duribun, Landing2Gif } from "@assets/imgs/landing";

export default function LandingTwo() {
  return (
    <Container>
      <div className="wrap">
        <main className="content">
          <Fade distance="20px" bottom delay={500} duration={700}>
            <h1 className="content__h1">
              한 번의 클릭으로
              <br />
              가볍게 파킹
            </h1>
          </Fade>
          <h2 className="content__h2">
            한번의 클릭으로 분산된
            <br />
            좋은 콘텐츠들을 한곳에 모아봐요
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
          <img className="img__gif" src={Landing2Gif.src} alt="gif" />
          <img className="img__duribun" src={Landing2Duribun} alt="duribun" />
        </div>
      </div>
    </Container>
  );
}

const Container = styled.section`
  width: 100%;
  height: 860px;
  background-color: #f6f6f6;
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
    position: relative;
    display: flex;
    align-items: center;
    width: 1024px;
    height: 100%;
    margin-left: 40px;
    margin-right: 40px;
    // content
    .content {
      display: flex;
      flex-direction: column;
      position: absolute;
      z-index: 2;
      &__h1 {
        font-size: 50px;
        line-height: 76px;
        font-weight: 700;
        color: var(--black_3);
      }
      &__h2 {
        margin-top: 30px;
        font-size: 17px;
        line-height: 26px;
        font-weight: 400;
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
      right: -25px;
      width: 530px;
      height: 490px;
      &__gif {
        position: absolute;
        top: 107px;
        left: 0;
        width: 415px;
        height: auto;
      }
      &__duribun {
        position: absolute;
        right: 30px;
        bottom: 20px;
        width: 206px;
        height: 173px;
      }
    }
  }
  ${({ theme }) => theme.media.tablet`
    height: 750px;
    // wrap
    .wrap {
      flex-direction: column;
      // content
      .content {
        margin-top: 80px;
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
      // images
      .img {
        position: relative;
        width: 315px;
        height: 277px;
        bottom: 135px;
        top: 250px;
        right: 2px;
        margin-top:60px;
        &__gif {
          width: 315px;
          height: 221px;
          top: 0;
          right: 0;
        }
        &__duribun {
          width: 144px;
          height: auto;
          bottom: 0;
          right:0;
        }
      }
    }
  `}
  ${({ theme }) => theme.media.mobile`
    height: 720px;
  `}
`;
