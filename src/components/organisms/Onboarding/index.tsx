import styled, { keyframes } from "styled-components";
import React, { Dispatch, SetStateAction, useState } from "react";
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

export interface OnboardingProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Onboarding = ({ isOpen, setIsOpen }: OnboardingProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const TOTAL_SLIDES = 4;

  const nextSlide = (e: React.MouseEvent<HTMLDivElement>) => {
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
  const pageOpenHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    target.innerText === "쿠키파킹 더 자세히 알아보기"
      ? window.open(
          "https://www.notion.so/Help-Support-a5f04ad03fe14940801520d1d2bd20ae",
        )
      : window.open(
          "https://chrome.google.com/webstore/detail/cookie-parking/gbpliecdabaekbhmncopnbkfpdippdnl?hl=ko",
        );
  };
  const closeHandler = () => {
    setIsOpen(false);
    setCurrentSlide(0);
  };

  return (
    <>
      {isOpen && (
        <>
          <Wrap onClick={closeHandler} />
          <ModalWrap>
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
                {currentSlide === 0 && <Slide src={page1} />}
                {currentSlide === 1 && <Slide src={page2} />}
                {currentSlide === 2 && <Slide src={page3} />}
                {currentSlide === 3 && <Slide src={page4} />}
                {currentSlide === 4 && <Slide src={page5} />}
              </ImgContainer>
            </SliderContainer>
            {currentSlide === 0 && <Duribun1 src={duribun1} />}
            {currentSlide === 2 && <Duribun3 src={duribun3} />}
            {currentSlide === 3 && <Duribun4 src={duribun4} />}
            {currentSlide === 4 && <Duribun5 src={duribun5} />}
            {currentSlide !== 4 ? (
              <Carousel>
                <div className={currentSlide === 0 ? "oval" : "circle"} />
                <div className={currentSlide === 1 ? "oval" : "circle"} />
                <div className={currentSlide === 2 ? "oval" : "circle"} />
                <div className={currentSlide === 3 ? "oval" : "circle"} />
                <div className={currentSlide === 4 ? "oval" : "circle"} />
              </Carousel>
            ) : (
              ""
            )}
            <MoveWrap>
              {currentSlide !== 0 ? (
                <PrevBtn onClick={prevSlide}>이전</PrevBtn>
              ) : (
                ""
              )}
              {currentSlide !== 4 ? (
                <NextBtn onClick={nextSlide}>다음</NextBtn>
              ) : (
                ""
              )}
            </MoveWrap>
            {currentSlide === 4 && (
              <StartBtn onClick={closeHandler}>파킹을 시작할래요!</StartBtn>
            )}
            <CloseBtn onClick={pageOpenHandler}>
              {currentSlide
                ? "쿠키파킹 더 자세히 알아보기"
                : "혹시 쿠키파킹을 설치하지 않으셨나요?"}
            </CloseBtn>
          </ModalWrap>
        </>
      )}
    </>
  );
};
export default Onboarding;

const Wrap = styled.div`
  position: fixed;
  top: 0%;
  left: 0%;
  z-index: 100;

  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalWrap = styled.div`
  position: fixed;
  z-index: 101;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  width: 72rem;
  height: 50rem;
  border-radius: 2.4rem;
  background: var(--white);

  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TextContainer = styled.div`
  display: flex;
  width: 72rem;
  height: 14.8rem;
  padding: 5.2rem 0 4.8rem 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #ff9c59;
  border-radius: 2.4rem 2.4rem 0 0;
`;
const Text = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 2rem;
  line-height: 2.8rem;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.02em;
  color: var(--white);
  b {
    font-weight: 700;
  }
`;
const fadeIn = keyframes`
  0% {
    /* 위에서 내려오도록 */
    transform: translate(0,10px);
    opacity: 0;}
  10%{ opacity: 0;}
  100% {
    transform: translate(0,0);
    opacity: 1;
  }
`;

interface SliderContainerProps {
  currentSlide: number;
}

const SliderContainer = styled.div<SliderContainerProps>`
  position: absolute;
  top: 12.4rem;
  display: flex;
  flex-direction: column;
  width: 36rem;
  height: ${(props) =>
    props.currentSlide === 0 || props.currentSlide === 3 ? `20rem` : `25.2rem`};
  overflow: hidden;
  /* 선을 넘어간 이미지들은 보이지 않도록 */
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.12);
  border-radius: 1.6rem;
  animation: ${fadeIn} 0.5s linear;
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  animation: ${fadeIn} 0.5s linear;
`;
interface SlideProps {
  bg: StaticImageData;
}
const Slide = styled.img<SlideProps>`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 1.6rem;
  animation: ${fadeIn} 0.5s linear;
`;
const duribunAnimation = keyframes`
  0% {
    opacity: 0;
  }
  60% {
    opacity: 0;
  }
  90% {
    opacity: 1;
  }
`;

const Duribun1 = styled.img`
  width: 12rem;
  height: 12.8rem;
  position: absolute;
  top: 24.8rem;
  left: 13.9rem;
  animation: ${duribunAnimation} 0.4s linear;
`;
const Duribun3 = styled.img`
  width: 14.8rem;
  height: 12.4rem;
  position: absolute;
  top: 25.2rem;
  left: 13.2rem;
  animation: ${duribunAnimation} 0.5s linear;
`;
const Duribun4 = styled.img`
  width: 10.8rem;
  height: 12.4rem;
  position: absolute;
  top: 25.3rem;
  left: 48.4rem;
  animation: ${duribunAnimation} 0.4s linear;
`;
const Duribun5 = styled.img`
  width: 11rem;
  height: 11rem;
  position: absolute;
  top: 26.6rem;
  left: 13rem;
  animation: ${duribunAnimation} 0.4s linear;
`;
const Carousel = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  padding-top: 43rem;
  .circle {
    transition: 0.2s;
    margin-left: 0.7rem;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 0.5rem;
    background: var(--gray_2);
  }
  .oval {
    transition: 0.2s;
    margin-left: 0.7rem;
    width: 2.8rem;
    height: 0.8rem;
    border-radius: 0.5rem;
    background: var(--orange);
  }
`;

const CloseBtn = styled.div`
  cursor: pointer;

  position: fixed;
  top: 52.3rem;

  padding: 1.7rem 3rem 1.7rem 3rem;
  border-radius: 2.8rem;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  font-size: 1.8rem;
  font-weight: 500;
  line-height: 2.2rem;
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

const PrevBtn = styled.div`
  position: absolute;
  top: 40.8rem;
  left: 4.4rem;
  cursor: pointer;
  width: 7.8rem;
  height: 5.2rem;
  background: var(--gray_2);
  color: var(--gray_6);
  border-radius: 2.6rem;
  font-style: normal;
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: var(--gray_hover_2);
  }
`;
const NextBtn = styled.div`
  position: absolute;
  top: 40.8rem;
  right: 4.4rem;
  cursor: pointer;
  width: 7.8rem;
  height: 5.2rem;
  background: var(--orange);
  color: var(--white);
  border-radius: 2.6rem;
  font-style: normal;
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: var(--orange_hover);
  }
`;
const StartBtn = styled.div`
  cursor: pointer;
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 40.8rem;
  box-sizing: border-box;
  width: 32rem;
  height: 5.2rem;
  font-style: normal;
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.6rem;
  letter-spacing: -0.02em;
  border: none;
  border-radius: 2.6rem;
  background: var(--orange);
  color: var(--white);
  &:active {
    outline: none;
  }
  &:hover {
    background: var(--orange_hover);
  }
`;
