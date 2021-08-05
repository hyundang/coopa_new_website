import { Dispatch, SetStateAction } from "react";
import styled, { css } from "styled-components";

export interface BtnProps {
  /** id */
  id?: string;
  /** className */
  className?: string;
  /** 버튼 안의 내용 */
  children: React.ReactNode;
  /**  버튼 클릭시 실행되는 함수 */
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  /** 버튼 색깔 판단 (true -> 주황색 버튼) */
  isOrange?: boolean;
  /** '디렉토리 공유하기' 버튼의 경우 -> true */
  isDirShare?: boolean;
  /** '디렉토리 공유하기' 버튼의 경우 hover 여부 판단 */
  setIsHover?: Dispatch<SetStateAction<boolean>>;
  /** 쿠키 카드 디렉토리 안의 '저장' 버튼의 경우 -> true */
  isCookieDirBtn?: boolean;
  /** 버튼 활성화 여부 (활성화 - >true / 비활성화 -> false) */
  isAtvBtn?: boolean;
}
const Btn = ({
  id,
  className,
  children,
  onClick,
  isOrange,
  isDirShare,
  setIsHover,
  isCookieDirBtn,
  isAtvBtn,
}: BtnProps) => {
  return (
    <BtnWrap
      id={id}
      className={className}
      onClick={onClick}
      isOrange={isOrange}
      isDirShare={isDirShare}
      isCookieDirBtn={isCookieDirBtn}
      isAtvBtn={isAtvBtn}
      onMouseEnter={setIsHover ? () => setIsHover(true) : undefined}
      onMouseLeave={setIsHover ? () => setIsHover(false) : undefined}
    >
      {children}
    </BtnWrap>
  );
};

export default Btn;

interface BtnWrapProps {
  isOrange?: boolean;
  isDirShare?: boolean;
  isCookieDirBtn?: boolean;
  isAtvBtn?: boolean;
}
const BtnWrap = styled.button<BtnWrapProps>`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;

  width: 100%;
  height: 100%;

  font-weight: 500;
  text-align: center;
  letter-spacing: -0.2px;

  transition: 0.2s;
  ${(props) =>
    props.isOrange
      ? props.isCookieDirBtn && !props.isAtvBtn
        ? css`
            border: 2px solid var(--gray_4);
            background-color: var(--white);
            color: var(--gray_4);
          `
        : css`
            background-color: var(--orange);
            color: var(--white);
            @media (hover: hover) {
              &:hover {
                background-color: var(--orange_hover);
              }
            }
          `
      : props.isDirShare
      ? css`
          border: 2px solid var(--orange);
          background-color: var(--white);
          color: var(--orange);
          @media (hover: hover) {
            &:hover {
              background-color: var(--orange_hover);
              box-shadow: var(--orange_box_shadow);
              color: var(--white);
            }
          }
        `
      : css`
          background-color: var(--gray_2);
          color: var(--gray_7);
          @media (hover: hover) {
            &:hover {
              background-color: var(--gray_hover_2);
            }
          }
        `};
`;
