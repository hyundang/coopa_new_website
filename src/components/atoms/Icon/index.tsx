import React, {
  RefObject,
  forwardRef,
  Dispatch,
  SetStateAction,
  ButtonHTMLAttributes,
  MouseEvent,
} from "react";
import styled from "styled-components";

export interface IconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  setIsHover?: Dispatch<SetStateAction<boolean>>;
}
const Icon = (
  {
    id,
    className,
    children,
    role = "button",
    style,
    onClick,
    setIsHover,
  }: IconProps,
  ref?:
    | ((instance: HTMLButtonElement | null) => void)
    | RefObject<HTMLButtonElement>
    | null
    | undefined,
) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick && onClick(e);
  };

  return (
    <IconWrap
      id={id}
      className={className}
      ref={ref}
      role={role}
      style={style}
      onClick={handleClick}
      onMouseOver={setIsHover ? () => setIsHover(true) : undefined}
      onMouseLeave={setIsHover ? () => setIsHover(false) : undefined}
    >
      {children}
    </IconWrap>
  );
};

export default forwardRef(Icon);

const IconWrap = styled.button`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
`;
