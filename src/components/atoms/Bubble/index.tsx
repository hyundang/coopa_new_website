import styled, { css } from "styled-components";

export interface BubbleProps {
  /** id */
  id?: string;
  /** className */
  className?: string;
  /** hover 여부 */
  isHover?: boolean;
  /** children */
  children?: React.ReactNode;
}
const Bubble = ({ id, className, isHover, children }: BubbleProps) => {
  return (
    <BubbleWrap id={id} className={className} isHover={isHover} role="tooltip">
      {children}
    </BubbleWrap>
  );
};

export default Bubble;

interface BubbleWrapProps {
  isHover?: boolean;
}
const BubbleWrap = styled.div<BubbleWrapProps>`
  padding: 9px 16px;
  background: var(--white);
  border-radius: 18.5px;
  border-width: 0;
  box-shadow: 0 5px 13px rgba(0, 0, 0, 0.15);

  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  text-align: center;
  line-height: 18px;
  color: var(--black_1);

  &::after {
    left: 50%;
    content: "";
    pointer-events: none;
    position: absolute;
    height: 0;
    width: 0;
  }
`;
