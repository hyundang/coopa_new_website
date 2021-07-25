import { Dispatch, SetStateAction } from "react";
import styled, { css } from "styled-components";

export interface BtnProps {
  /** 버튼 안의 내용 */
  children: React.ReactNode;
  /** pc css (width, height, borderRadius, fontSize) */
  Style: React.CSSProperties;
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
  children,
  Style,
  onClick,
  isOrange,
  isDirShare,
  setIsHover,
  isCookieDirBtn,
  isAtvBtn,
}: BtnProps) => {
  return (
    <BtnWrap
      Style={Style}
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
  Style: React.CSSProperties;
  isOrange?: boolean;
  isDirShare?: boolean;
  isCookieDirBtn?: boolean;
  isAtvBtn?: boolean;
}
const BtnWrap = styled.button<BtnWrapProps>`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;

  width: ${(props) => props.Style.width};
  height: ${(props) => props.Style.height};
  border-radius: ${(props) => props.Style.borderRadius};

  font-size: ${(props) => props.Style.fontSize};
  font-weight: 500;
  text-align: center;
  line-height: ${(props) => props.Style.height};
  letter-spacing: -0.2px;

  transition: 0.2s;
  ${(props) =>
    props.isOrange
      ? props.isCookieDirBtn && !props.isAtvBtn
        ? css`
            border: 0.2rem solid var(--gray_4);
            background-color: var(--white);
            color: var(--gray_4);
          `
        : css`
            background-color: var(--orange);
            color: var(--white);
            &:hover {
              background-color: var(--orange_hover);
            }
          `
      : props.isDirShare
      ? css`
          border: 0.2rem solid var(--orange);
          background-color: var(--white);
          color: var(--orange);
          &:hover {
            background-color: var(--orange_hover);
            box-shadow: var(--orange_box_shadow);
            color: var(--white);
          }
        `
      : css`
          background-color: var(--gray_2);
          color: var(--gray_7);
          &:hover {
            background-color: var(--gray_hover_2);
          }
        `};
`;
