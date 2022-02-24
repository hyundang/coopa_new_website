import { NotiImg } from "@assets/imgs/header";
import { modalAnimation } from "@components/animations";
import { Btn, MoveModal } from "@components/atoms";
import React, { Dispatch, SetStateAction } from "react";
import styled, { css } from "styled-components";

export interface NotiModalProps {
  id?: string;
  className?: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  /** x 좌표 */
  locationX: number;
}
const NotiModal = ({
  id,
  className,
  isOpen,
  setIsOpen,
  locationX,
}: NotiModalProps) => {
  return (
    <NotiModalWrap
      id={id}
      className={className}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      locationX={locationX}
    >
      <NotiImg className="noti-img" role="img" />
      <span className="noti-text">
        오랜만에 <b className="noti-text--bold">새로운 기능</b>이
        출시되었어요!⭐
        {"\n더 보기를 눌러 자세히 살펴보세요!"}
      </span>
      <Btn
        className="noti-button"
        isOrange
        isAtvBtn
        onClick={() => window.open(NOTICE_URL, "_blank")}
        role="link"
      >
        더보기
      </Btn>
    </NotiModalWrap>
  );
};

export default NotiModal;

interface NotiModalWrapProps {
  locationX: number;
}
const NotiModalWrap = styled(MoveModal)<NotiModalWrapProps>`
  position: fixed;
  top: 56px;
  left: ${({ locationX }) => locationX}px;

  width: 432px;
  height: 104px;
  padding: 24px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.13);
  border-radius: 16px;

  display: flex;
  flex-direction: row;
  align-items: center;

  transition: 0.4s all;
  ${({ isOpen }) =>
    isOpen
      ? css`
          opacity: 1;
          visibility: visible;
          animation: ${modalAnimation.notiFadeInRule};
        `
      : css`
          opacity: 0;
          visibility: hidden;
          animation: ${modalAnimation.notiFadeOutRule};
        `}

  .noti-img {
    width: 56px;
    height: 56px;
    margin-right: 14px;
  }

  .noti-text {
    margin-right: 24px;
    font-size: 13px;
    line-height: 20px;
    color: var(--black_1);
    white-space: pre-wrap;
  }

  .noti-button {
    width: 71px;
    height: 36px;
    font-size: 13px;
    border-radius: 18px;
  }
`;
