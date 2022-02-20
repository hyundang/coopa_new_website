import {
  BubbleImg,
  FloatMeerkatImg,
  FloatMeerkatImgHAtv,
} from "@assets/imgs/floating";
import React, { useState } from "react";
import styled, { css } from "styled-components";

const Floating = () => {
  const [isHover, setIsHover] = useState(false);
  const handleClick = () => window.open("https://linktr.ee/dooribun");

  return (
    <Container>
      <Float className="floating" isHover={isHover} />
      <IconWrap
        isHover={isHover}
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="meerkat" onClick={handleClick} />
      </IconWrap>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  right: 69px;
  bottom: 69px;
  width: 80px;
  height: 88.5px;
  z-index: 2;

  ${({ theme }) => theme.media.mobile`
    right: 20px;
    bottom: 28px;
  `}
`;

const Float = styled(BubbleImg)<IconWrapProps>`
  ${({ theme }) => theme.media.mobile`
    display: none;
  `}

  position: absolute;
  top: 0;
  left: 0;

  transition: opacity 0.3s, visibility 0.3s;
  ${({ isHover }) =>
    isHover
      ? css`
          transition-delay: 0.2s;
          opacity: 1;
          visibility: visible;
        `
      : css`
          opacity: 0;
          visibility: hidden;
        `};
`;

interface IconWrapProps {
  isHover: boolean;
}
const IconWrap = styled.div<IconWrapProps>`
  position: fixed;
  margin-top: auto;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 54px;
  height: 54px;
  border-radius: 27px;
  border: 1px solid var(--gray_3);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
  right: 69px;
  bottom: 69px;

  ${({ theme }) => theme.media.mobile`
    right: 20px;
    bottom: 28px;
  `}

  &:hover {
    transition: 0.2s;
    transform: scale(1.2);
    .meerkat {
      background: url("${FloatMeerkatImgHAtv}") center center / cover no-repeat;
    }
  }
  .meerkat {
    width: 36.64px;
    height: 28.6px;
    ${({ isHover }) =>
      isHover
        ? css`
            background: url("${FloatMeerkatImgHAtv}") center center / cover
              no-repeat;
          `
        : css`
            background: url("${FloatMeerkatImg}") center center / cover
              no-repeat;
          `}
  }
`;

export default Floating;
