import { NoThumbImg } from "@assets/imgs/card";
import React, { Dispatch, SetStateAction } from "react";
import styled, { css } from "styled-components";

export interface IProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  /** 이미지 url */
  url?: string;
  isHover?: boolean;
  setIsHover?: Dispatch<SetStateAction<boolean>>;
  isLoading?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /** img input 여부 */
  isImgInput?: boolean;
}
const ImgBox = ({
  id,
  className,
  children,
  style,
  url,
  isHover,
  setIsHover,
  isLoading,
  onClick,
  isImgInput = false,
}: IProps) => {
  return (
    <ImgBoxWrap
      id={id}
      className={className}
      role="img"
      url={url}
      style={style}
      isHover={isHover}
      onMouseEnter={setIsHover ? () => setIsHover(true) : undefined}
      onMouseLeave={setIsHover ? () => setIsHover(false) : undefined}
      isLoading={isLoading}
      onClick={onClick}
      isImgInput={isImgInput}
    >
      {children}
    </ImgBoxWrap>
  );
};

export default ImgBox;

interface ImgBoxWrapProps {
  url?: string;
  isLoading?: boolean;
  isHover?: boolean;
  isImgInput: boolean;
}
const ImgBoxWrap = styled.div<ImgBoxWrapProps>`
  cursor: pointer;
  overflow: hidden;

  ${({ isImgInput, isLoading, isHover, url }) =>
    isImgInput
      ? !isLoading && isHover
        ? css`
            background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
              url("${url}") center center/cover;
          `
        : css`
            background: url("${url}") center center/cover;
          `
      : !isLoading && isHover
      ? css`
          background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
            url("${url}") center center/cover,
            url(${NoThumbImg}) center center/cover;
        `
      : css`
          background: url("${url}") center center/cover,
            url(${NoThumbImg}) center center/cover;
        `}
`;
