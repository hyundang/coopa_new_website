import styled from "styled-components";
import Fade from "react-reveal/Fade";
import { LogoImg } from "@assets/imgs/common";
import { WebStoreBtn } from "@components/atoms";
import {
  Landing1Duribun1,
  Landing1Duribun2,
  Landing1Duribun3,
} from "@assets/imgs/landing";

export default function LandingOne() {
  return (
    <Container>
      <LogoImg className="navlogo" role="img" />
      <main className="content">
        <h1 className="content__h1">
          성장하는 사람들을 위한
          <br />
          가장 간편한 컨텐츠 파킹랏
        </h1>
        <h2 className="content__h2">
          그때 봤던 그 콘텐츠 어디있지
          <br />
          나만의 콘텐츠들을 한 곳에 모아봐요
        </h2>
        <WebStoreBtn className="webstore_button" />
      </main>
      <Fade distance="55px" right delay={1050} duration={700} enter>
        <img alt="duribun3" className="d3" src={Landing1Duribun3} />
      </Fade>
      <Fade distance="30px" bottom delay={500} duration={700}>
        <div className="img">
          <img alt="duribun1" className="img__d1" src={Landing1Duribun1} />
          <img alt="duribun2" className="img__d2" src={Landing1Duribun2} />
        </div>
      </Fade>
    </Container>
  );
}

const Container = styled.section`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1,
  h2 {
    margin: 0;
    font-weight: 400;
  }

  .navlogo {
    position: absolute;
    top: 14px;
    left: 28px;
    width: 159.92px;
    height: 30px;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    &__h1 {
      margin-bottom: 43px;
      font-size: 48px;
      line-height: 72px;
      font-weight: 700;
      color: var(--black_4);
      text-align: center;
    }
    &__h2 {
      margin-bottom: 33px;
      font-size: 17px;
      line-height: 26px;
      color: var(--gray_7);
      text-align: center;
    }
    .chrome {
      cursor: pointer;
      margin-top: 20px;
      width: 328px;
      height: 58px;
      border-radius: 29px;
      background: #f6f6f6;
      display: flex;
      justify-content: center;
      align-items: center;
      &__icon {
        width: 28px;
        height: 28px;
      }
      &__desc {
        padding-top: 1px;
        margin-left: 16px;
        color: var(--black_1);
        font-size: 18px;
        line-height: 21.6px;
        font-weight: 500;
      }
      transition: all 0.5s;
      :hover {
        background-color: #fafafa;
        box-shadow: 0px 3px 13px rgba(0, 0, 0, 0.15);
        transform: translateY(-2px);
      }
    }
  }

  .d3 {
    position: absolute;
    top: 92px;
    right: 0;
    width: 170px;
    height: 194px;
    @media screen and (max-width: 1280px) {
      width: 11.3vw;
      height: 13vw;
    }
    @media screen and (max-width: 1024px) {
      width: 115px;
      height: 133px;
    }
    @media screen and (max-width: 769px) {
      width: 105px;
      height: auto;
    }
  }
  .img {
    position: absolute;
    bottom: 0;
    width: 100%;
    &__d1 {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 536px;
      height: 268px;
      @media screen and (max-width: 1280px) {
        width: 37vw;
        height: 18.5vw;
      }
      @media screen and (max-width: 1024px) {
        width: 378px;
        height: 189px;
      }
      @media screen and (max-width: 769px) {
        width: 304px;
        height: auto;
      }
    }
    &__d2 {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 569px;
      height: 262px;
      @media screen and (max-width: 1280px) {
        width: 39vw;
        height: 18vw;
      }
      @media screen and (max-width: 1024px) {
        width: 399px;
        height: 184px;
      }
      @media screen and (max-width: 769px) {
        width: 234px;
        height: auto;
      }
    }
  }

  ${({ theme }) => theme.media.tablet`
    // navlogo
    .navlogo {
      top: 20px;
      left: 50%;
      transform: translate(-50%, 0);
    }
    // content
    .content {
      &__h1 {
        margin-bottom: 20px;
        font-size: 28px;
        line-height: 42px;
      }
      &__h2 {
        margin-bottom: 30px;
        font-size: 15px;
        line-height: 23px;
      }
      .chrome {
        width: 292px;
        height: 56px;
        margin-top: 30px;
        border-radius: 28px;
        &__desc {
          font-size: 17px;
          line-height: 20.4px;
        }
      }
    }
    // images
    .img {
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      &__d1 {
        position: static;
      }
      &__d2 {
        position: static;
      }
    }
  `}
  ${({ theme }) => theme.media.mobile`
    .content {
      &__h1 {
        margin-bottom: 18px;
        font-size: 26px;
        line-height: 39px;
      }
      &__h2 {
        margin-bottom: 30px;
        font-size: 14px;
        line-height: 23px;
      }
      .chrome {
        width: 285px;
        height: 54px;
        margin-top: 30px;
        &__desc {
          font-size: 16px;
          line-height: 19.2px;
        }
      }
  `}
`;
