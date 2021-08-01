import styled from "styled-components";

export interface IProps {
  /** 내부에 들어가는 컴포넌트 */
  children?: React.ReactNode;
  /** hover 판단 */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
const CardIcon = ({ children, onClick }: IProps) => {
  return <IconWrap onClick={onClick}>{children}</IconWrap>;
};

export default CardIcon;

interface IIconWrap {
  src?: string;
}
const IconWrap = styled.button<IIconWrap>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 4rem;
  height: 4rem;
  border-radius: 2rem;
  border: none;
  background-color: transparent;
  -webkit-filter: drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.9));
  transition: 0.2s;
  &:hover {
    background-color: rgba(243, 243, 243, 0.4);
    -webkit-filter: none;
  }
`;
