import { Dispatch, SetStateAction } from "react";
import styled, { css } from "styled-components";

export interface IProps {
  /** id */
  id?: string;
  /** imgbox class name */
  className?: string;
  /** 내부에 들어가는 컴포넌트 */
  children?: React.ReactNode;
  /** 이미지 박스 스타일 */
  style?: React.CSSProperties;
  /** 이미지 url */
  url?: string;
  /** hover 판단 */
  setIsHover?: Dispatch<SetStateAction<boolean>>;
  /** post시 loading 여부 */
  isLoading?: boolean;
}
const ImgBox = ({
  id,
  className,
  children,
  style,
  url,
  setIsHover,
  isLoading,
}: IProps) => {
  return (
    <Wrap
      id={id}
      className={className}
      url={url}
      style={style}
      onMouseEnter={setIsHover ? () => setIsHover(true) : undefined}
      onMouseLeave={setIsHover ? () => setIsHover(false) : undefined}
      isLoading={isLoading}
    >
      {children}
    </Wrap>
  );
};

export default ImgBox;

interface IWrap {
  url?: string;
  isLoading?: boolean;
}
const Wrap = styled.div<IWrap>`
  cursor: pointer;
  overflow: hidden;
  background: url(${(props) => props.url}) center center/cover;

  ${(props) =>
    !props.isLoading &&
    css`
      @media (hover: hover) {
        &:hover {
          background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
            url(${props.url}) center center/cover;
        }
      }
    `}
`;
