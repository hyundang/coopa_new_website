import styled from "styled-components";
import { DropDownIcon } from "@assets/icons/card";
import { Dispatch, SetStateAction } from "react";
import { dropdownAnimation } from "@components/animations";

export interface DropDownProps {
  /** id */
  id?: string;
  /** className */
  className?: string;
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
const DropDown = ({
  id,
  className,
  children,
  selectedItem,
  style,
  isActive,
  setIsActive,
}: DropDownProps) => {
  return (
    <DropDownWrap
      id={id}
      className={className}
      style={style}
      onClick={() => setIsActive(!isActive)}
      isActive={isActive}
    >
      <details className="dropdown-details">
        <summary className="current">
          <p>{selectedItem}</p>
          <DropDownIcon />
        </summary>
        <div className="content">{children}</div>
      </details>
    </DropDownWrap>
  );
};

export default DropDown;

interface DropDownWrapProps {
  isActive: boolean;
}
const DropDownWrap = styled.div<DropDownWrapProps>`
  .current {
    all: unset;
    cursor: pointer;
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
    padding: 18px 11px 12px 11px;
    margin-top: 10px;
    border-radius: 16px;
    background: var(--white);
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.2);
    animation: ${dropdownAnimation.fadeInRule};
  }
`;
