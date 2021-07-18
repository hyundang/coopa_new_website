import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

export interface IProps {
  /** 내부에 들어가는 컴포넌트 */
  children?: React.ReactNode;
  /** 이미지 박스 스타일 */
  style?: React.CSSProperties;
  /** 이미지 url */
  url?: string;
  /** hover 판단 */
  setIsHover?: Dispatch<SetStateAction<boolean>>;
}
const ImgBox = ({ children, style, url, setIsHover }: IProps) => {
  return (
    <Wrap
      url={url}
      style={style}
      onMouseEnter={setIsHover ? () => setIsHover(true) : undefined}
      onMouseLeave={setIsHover ? () => setIsHover(false) : undefined}
    >
      {children}
    </Wrap>
  );
};

export default ImgBox;

interface IWrap {
  url?: string;
}
const Wrap = styled.div<IWrap>`
  cursor: pointer;

  background: url(${(props) => props.url}) center center/cover;

  &:hover {
    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
      url(${(props) => props.url}) center center/cover;
  }
`;
