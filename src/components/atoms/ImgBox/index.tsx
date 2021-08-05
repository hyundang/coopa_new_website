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
  /** hover 여부 */
  isHover?: boolean;
  /** hover 여부 setState */
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
  isHover,
  setIsHover,
  isLoading,
}: IProps) => {
  return (
    <Wrap
      id={id}
      className={className}
      role="img"
      url={url}
      style={style}
      isHover={isHover}
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
  isHover?: boolean;
}
const Wrap = styled.div<IWrap>`
  cursor: pointer;
  overflow: hidden;
  background: url(${(props) => props.url}) center center/cover;

  ${(props) =>
    !props.isLoading &&
    props.isHover &&
    css`
      background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
        url(${props.url}) center center/cover;
    `}
`;
