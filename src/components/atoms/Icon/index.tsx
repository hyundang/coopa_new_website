import { RefObject, forwardRef } from "react";
import styled from "styled-components";

export interface IconProps {
  /** id */
  id?: string;
  /** className */
  className?: string;
  /** icon 안에 들어가는 것 */
  children?: React.ReactNode;
  /** button role */
  role?: string;
  /** click event handler */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** icon css (width, height, borderRadius...) */
  style?: React.CSSProperties;
}
const Icon = (
  { id, className, children, role = "button", style, onClick }: IconProps,
  ref?:
    | ((instance: HTMLButtonElement | null) => void)
    | RefObject<HTMLButtonElement>
    | null
    | undefined,
) => {
  return (
    <IconWrap
      id={id}
      className={className}
      ref={ref}
      role={role}
      style={style}
      onClick={onClick}
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
