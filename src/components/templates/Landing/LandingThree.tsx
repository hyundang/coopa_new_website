import styled from "styled-components";
import Fade from "react-reveal/Fade";
import { Landing3Duribun, Landing3Gif } from "@assets/imgs/landing";

export default function LandingThree() {
  return (
    <Container>
      <div className="wrap">
        <main className="content">
          <Fade distance="20px" bottom delay={500} duration={700}>
            <h1 className="content__h1">
              손쉬운 분류로
              <br />
              차곡차곡 정리
            </h1>
          </Fade>
          <h2 className="content__h2">
            어렵고 귀찮은 정리,
            <br />
            디렉토리로 쉽게 분류해요
          </h2>
        </main>
        <div className="img">
          <img alt="gif" className="img__gif" src={Landing3Gif} />
          <Fade distance="26px" bottom delay={1100} duration={700}>
            <img alt="duribun" className="img__duribun" src={Landing3Duribun} />
          </Fade>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.section`
  width: 100%;
  height: 860px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fefcfe;
  h1,
  h2 {
    margin: 0;
  }

  .wrap {
    display: flex;
    align-items: center;
    position: relative;
    width: 1024px;
    height: 100%;
    margin-left: 40px;
    margin-right: 40px;
    .img {
      position: absolute;
      width: 589px;
      height: 565px;
      &__gif {
        position: absolute;
        width: 415px;
        height: 290px;
        right: 90px;
        top: 130px;
      }
      &__duribun {
        position: absolute;
        width: 183px;
        height: 194px;
        left: 0;
        bottom: 45px;
      }
    }
    .content {
      position: absolute;
      right: 84px;
      z-index: 5;
      display: flex;
      flex-direction: column;
      &__h1 {
        margin-bottom: 30px;
        font-size: 50px;
        font-weight: 700;
        line-height: 75px;
        color: var(--black_3);
      }
      &__h2 {
        font-weight: 400;
        font-size: 17px;
        line-height: 26px;
        color: var(--gary_7);
      }
    }
  }
  ${({ theme }) => theme.media.tablet`
    height: 760px;
    // container
    .wrap {
      flex-direction: column;
      // content
      .content {
          height: auto;
        top: 80px;
        margin-top: 0;
        text-align: center;
        right: 0;
        left: 50%;
        transform: translate(-50%, 0);
        &__h1 {
          font-size: 28px;
          line-height: 42px;
          margin-bottom: 19px;
        }
        &__h2 {
          font-size: 15px;
          line-height: 23px;
        }
      }
      // images
      .img {
        position: relative;
        max-width: 315px;
        height: 316px;
        margin-top: 60px;
        top: 220px;
        bottom: 0;
        
        &__gif {
          width: 316px;
          height: 221px;
          top: 0;
          right: 0;
        }
        &__duribun {
          width: 128px;
          height: 135px;
          left: 0;
          bottom: 0;
        }
      }
    }
  `}
  ${({ theme }) => theme.media.mobile`
    height: 780px;
    .wrap {
      .content {
        top: 110px;
      }
      .img {
        left: 50%;
        transform: translate(-50%, 0);
      }
    }
  `}
`;
