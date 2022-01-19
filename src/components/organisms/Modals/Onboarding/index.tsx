import styled from "styled-components";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
// assets
import {
  page1,
  page2,
  page3,
  page4,
  page5,
  duribun1,
  duribun3,
  duribun4,
  duribun5,
} from "@assets/imgs/onboarding";
import { Btn, Modal } from "@components/atoms";
import { onboardingAnimation } from "@components/animations";

export interface OnboardingProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Onboarding = ({ isOpen, setIsOpen }: OnboardingProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const TOTAL_SLIDES = 4;

  const nextSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (currentSlide >= TOTAL_SLIDES) {
      // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };
  const closeHandler = () => {
    setIsOpen(false);
    setCurrentSlide(0);
  };

  // useEffect(() => {
  //   console.log(page1);
  // }, []);
  return (
    <ModalWrap
      isOpen={isOpen}
      setIsOpen={() => {
        setIsOpen(false);
        setCurrentSlide(0);
      }}
    >
      <TextContainer>
        {currentSlide === 0 && (
          <Text>
            먼저 쿠키파킹 아이콘을 <b>&nbsp;상단에 고정</b>해주세요!
          </Text>
        )}
        {currentSlide === 1 && (
          <Text>
            다시 보고 싶은 웹페이지
            <br />
            <b>&nbsp;클릭 한 번</b>으로 저장해보세요!
          </Text>
        )}
        {currentSlide === 2 && (
          <Text>
            저장과 함께 콘텐츠를 <b>&nbsp;바로 정리</b>해보세요!
          </Text>
        )}
        {currentSlide === 3 && (
          <Text>
            저장한 콘텐츠는 <br />
            <b>&nbsp;새 탭을 열 때</b>마다 확인할 수 있어요!
          </Text>
        )}
        {currentSlide === 4 && (
          <Text>
            내가 모은 콘텐츠를
            <br />
            <b>&nbsp;한 번에 공유</b>할 수 있어요!
          </Text>
        )}
      </TextContainer>
      <SliderContainer currentSlide={currentSlide}>
        <ImgContainer>
          {
            //@ts-ignore
            currentSlide === 0 && <Slide src={page1.src} />
          }
          {
            //@ts-ignore
            currentSlide === 1 && <Slide src={page2.src} />
          }
          {
            //@ts-ignore
            currentSlide === 2 && <Slide src={page3.src} />
          }
          {
            //@ts-ignore
            currentSlide === 3 && <Slide src={page4.src} />
          }
          {
            //@ts-ignore
            currentSlide === 4 && <Slide src={page5.src} />
          }
        </ImgContainer>
      </SliderContainer>
      {currentSlide === 0 && <Duribun1 src={duribun1} />}
      {currentSlide === 2 && <Duribun3 src={duribun3} />}
      {currentSlide === 3 && <Duribun4 src={duribun4} />}
      {currentSlide === 4 && <Duribun5 src={duribun5} />}
      {currentSlide !== 4 ? (
        <Carousel>
          <span className={currentSlide === 0 ? "oval" : "circle"} />
          <span className={currentSlide === 1 ? "oval" : "circle"} />
          <span className={currentSlide === 2 ? "oval" : "circle"} />
          <span className={currentSlide === 3 ? "oval" : "circle"} />
          <span className={currentSlide === 4 ? "oval" : "circle"} />
        </Carousel>
      ) : (
        ""
      )}
      <MoveWrap>
        {currentSlide !== 0 ? (
          <PrevBtn onClick={prevSlide} isAtvBtn>
            이전
          </PrevBtn>
        ) : (
          ""
        )}
        {currentSlide !== 4 ? (
          <NextBtn onClick={nextSlide} isAtvBtn isOrange>
            다음
          </NextBtn>
        ) : (
          ""
        )}
      </MoveWrap>
      {currentSlide === 4 && (
        <StartBtn onClick={closeHandler} isAtvBtn isOrange>
          파킹을 시작할래요!
        </StartBtn>
      )}

      {currentSlide ? (
        <Link
          href="https://www.notion.so/Help-Support-a5f04ad03fe14940801520d1d2bd20ae"
          target="_blank"
        >
          쿠키파킹 더 자세히 알아보기
        </Link>
      ) : (
        <Link
          href="https://chrome.google.com/webstore/detail/cookie-parking/gbpliecdabaekbhmncopnbkfpdippdnl?hl=ko"
          target="_blank"
        >
          혹시 쿠키파킹을 설치하지 않으셨나요?
        </Link>
      )}
    </ModalWrap>
  );
};
export default Onboarding;

const ModalWrap = styled(Modal)`
  width: 720px;
  height: 500px;
  border-radius: 24px;
  background: var(--white);

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextContainer = styled.div`
  display: flex;
  width: 720px;
  height: 148px;
  padding: 52px 0 48px 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #ff9c59;
  border-radius: 24px 24px 0 0;
`;
const Text = styled.h1`
  all: unset;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  display: flex;
  align-items: center;
  text-align: center;
  color: var(--white);
  b {
    font-weight: 700;
  }
`;

interface SliderContainerProps {
  currentSlide: number;
}
const SliderContainer = styled.div<SliderContainerProps>`
  position: absolute;
  top: 124px;
  display: flex;
  flex-direction: column;
  width: 360px;
  height: ${(props) =>
    props.currentSlide === 0 || props.currentSlide === 3 ? `200px` : `252px`};
  overflow: hidden;
  /* 선을 넘어간 이미지들은 보이지 않도록 */
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.12);
  border-radius: 16px;
  animation: ${onboardingAnimation.fadeInRule};
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  animation: ${onboardingAnimation.fadeInRule};
`;

const Slide = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 16px;
  animation: ${onboardingAnimation.fadeInRule};
`;

const Duribun1 = styled.img`
  width: 120px;
  height: 128px;
  position: absolute;
  top: 248px;
  left: 139px;
  animation: ${onboardingAnimation.duribunRule};
`;
const Duribun3 = styled.img`
  width: 148px;
  height: 124px;
  position: absolute;
  top: 252px;
  left: 132px;
  animation: ${onboardingAnimation.duribunRule};
`;
const Duribun4 = styled.img`
  width: 108px;
  height: 124px;
  position: absolute;
  top: 253px;
  left: 484px;
  animation: ${onboardingAnimation.duribunRule};
`;
const Duribun5 = styled.img`
  width: 110px;
  height: 110px;
  position: absolute;
  top: 266px;
  left: 130px;
  animation: ${onboardingAnimation.duribunRule};
`;
const Carousel = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  padding-top: 430px;
  .circle {
    transition: 0.3s;
    margin-left: 7px;
    width: 8px;
    height: 8px;
    border-radius: 5px;
    background: var(--gray_2);
  }
  .oval {
    transition: 0.3s;
    margin-left: 7px;
    width: 28px;
    height: 8px;
    border-radius: 5px;
    background: var(--orange);
  }
`;

const Link = styled.a`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;

  position: fixed;
  top: 523px;

  padding: 17px 30px;
  border-radius: 28px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  text-decoration-line: underline;
  color: var(--white);

  &:hover {
    background: rgba(247, 240, 237, 0.3);
  }
`;

const MoveWrap = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const PrevBtn = styled(Btn)`
  position: absolute;
  top: 408px;
  left: 44px;
  width: 78px;
  height: 52px;
  border-radius: 26px;
  font-size: 18px;
`;
const NextBtn = styled(Btn)`
  position: absolute;
  top: 408px;
  right: 44px;
  width: 78px;
  height: 52px;
  border-radius: 26px;
  font-size: 18px;
`;
const StartBtn = styled(Btn)`
  position: absolute;
  top: 408px;
  width: 320px;
  height: 52px;
  font-size: 18px;
  border-radius: 26px;
`;
