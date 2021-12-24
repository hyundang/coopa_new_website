import styled from "styled-components";
import Fade from "react-reveal/Fade";
import { CookieIcon } from "@assets/icons/common";
import { ChromeStoreImg, Landing5Mac } from "@assets/imgs/landing";
import { WebStoreBtn } from "@components/atoms";

export default function LandingFive() {
  return (
    <Container>
      <main className="content">
        <Fade distance="20px" bottom delay={500} duration={700}>
          <h1 className="content__h1">
            새 탭에서
            <br />
            매일 쿠키파킹
            <CookieIcon className="cookie-icon" />
          </h1>
        </Fade>
        <h2 className="content__h2">
          가볍게 쌓이는 성장의 만족감, 지금 시작하세요!
        </h2>
        <h3 className="content__h3">
          가볍게 쌓이는 성장의 만족감,
          <br />
          지금 시작하세요!
        </h3>
        <WebStoreBtn className="webstore_button" />
      </main>
      <div className="empty" />
      <Fade distance="30px" bottom delay={850} duration={700}>
        <div className="img">
          <img alt="img__mac" className="img__mac" src={Landing5Mac} />
        </div>
      </Fade>
    </Container>
  );
}

const Container = styled.section`
  width: 100%;
  height: 1020px;
  background-color: var(--orange);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1,
  h2,
  h3 {
    margin: 0;
  }

  // images
  .img {
    max-width: 1024px;
    max-height: 565px;
    margin-left: 40px;
    margin-right: 40px;
    display: flex;
    &__mac {
      flex: 1;
      width: 100%;
      height: 100%;
      -webkit-filter: drop-shadow(-10px 0 30px rgba(0, 0, 0, 0.15));
    }
  }
  .empty {
    flex: 1;
  }

  // content
  .content {
    padding-top: 110px;
    text-align: center;
    color: var(--white);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &__h1 {
      /* margin-top: 20px; */
      margin-bottom: 30px;
      text-align: center;
      font-size: 50px;
      line-height: 75px;
      font-weight: 700;
      .cookie-icon {
        width: 30px;
        height: 30px;
        margin-left: 10px;
      }
    }
    &__h2 {
      margin-bottom: 20px;
      font-size: 17px;
      font-weight: 500;
      line-height: 28px;
    }
    &__h3 {
      display: none;
    }
  }
  ${({ theme }) => theme.media.tablet`
    height: 535px;
    .content {
      padding-top: 76px;
      text-align: center;
      &__h1 {
        margin-bottom: 19px;
        font-size: 28px;
        line-height: 42px;
        .cookie-icon {
            width: 22px;
            height: 22px;
            margin-left: 7px;
        }
      }
      &__h2 {
        display: none;
      }
      &__h3 {
        margin-bottom:20px;
        display: block;
        font-size: 14px;
        line-height: 23px;
      }
    }
    .img{
      &__mac {
      width: 313px;
      height: 173px;
      }
    }
  `}
`;
