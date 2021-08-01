import styled, { keyframes } from "styled-components";
import downIcon from "@assets/icons/card/icon_dropdown.svg";
import { Dispatch, SetStateAction } from "react";

export interface IProps {
  /** 내부에 들어가는 컴포넌트 */
  children?: React.ReactNode;
  //현재 디렉토리
  selectedItem?: string | undefined;
  //style
  style?: React.CSSProperties;
  //dropdown active state
  isActive: boolean;
  //dropdown active setState
  setIsActive: Dispatch<SetStateAction<boolean>>;
}
const CardIcon = ({
  children,
  selectedItem,
  style,
  isActive,
  setIsActive,
}: IProps) => {
  return (
    <DropDownWrap
      style={style}
      onClick={() => setIsActive(!isActive)}
      isActive={isActive}
    >
      <div className="current">
        <p>{selectedItem}</p>
        <img src={downIcon} alt="downIcon" />
      </div>
      {isActive && <div className="content">{children}</div>}
    </DropDownWrap>
  );
};

export default CardIcon;

interface IDropDownWrap {
  isActive: boolean;
}
const DropDownWrap = styled.section<IDropDownWrap>`
  /* background-color: black; */
  .current {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-radius: 22px;
    background: rgba(255, 255, 255, 0.92);
    p {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
    }
    img {
      position: absolute;
      right: 13px;
    }
  }
  .content {
    width: 100%;
    padding: 1.8rem 0.9rem 1.2rem 1.1rem;
    margin-top: 1rem;
    border-radius: 1.6rem;
    background: var(--white);
    box-shadow: 0px 0.2rem 2rem rgba(0, 0, 0, 0.2);
    animation: ${(props) => (props.isActive ? fadeOut : fadeIn)} 0.3s linear;
  }
`;

const fadeOut = keyframes`
  from {
    transform: translate(0,-0.4rem);
    opacity: 0;
  }
  to {
    transform: translate(0,0);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    transform: translate(0,-0.4);
    opacity: 1;
  }
  to {
    transform: translate(0,0);
    opacity: 0;
  }
`;
