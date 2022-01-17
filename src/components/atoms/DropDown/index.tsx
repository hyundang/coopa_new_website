import { DropDownIcon } from "@assets/icons/card";
import { dropdownAnimation } from "@components/animations";
import React, { Dispatch, MouseEvent, SetStateAction } from "react";
import styled from "styled-components";

export interface DropDownProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  /** 현재 디렉토리 */
  selectedDir: string;
  /** dropdown active state */
  isActive: boolean;
  /** dropdown active setState */
  setIsActive: Dispatch<SetStateAction<boolean>>;
}
const DropDown = ({
  id,
  className,
  children,
  selectedDir,
  style,
  isActive,
  setIsActive,
}: DropDownProps) => {
  const handleClickWrap = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsActive(!isActive);
  };

  return (
    <DropDownWrap
      id={id}
      className={className}
      style={style}
      onClick={handleClickWrap}
      isActive={isActive}
    >
      <details className="dropdown-details">
        <summary className="current">
          <p>{selectedDir}</p>
          <DropDownIcon className="icon" />
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
      max-width: 75%;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    img {
      position: absolute;
      right: 13px;
    }
    .icon {
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
