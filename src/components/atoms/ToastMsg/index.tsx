import { toastmsgAnimation } from "@components/animations";
import { Dispatch, SetStateAction, useEffect } from "react";
import styled from "styled-components";

export interface IProps {
  /** id */
  id?: string;
  /** className */
  className?: string;
  /** 토스트 메시지 */
  children: React.ReactNode;
  /** 토스트 메시지 렌더링 여부 */
  isVisible: boolean;
  /** isVisible set 함수 */
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  /** 이미지 크기 제한을 넘겼을 때 뜨는 토스트 메세지 여부 */
  imgSizeOver?: boolean;
}
const ToastMsg = ({
  id,
  className,
  children,
  isVisible,
  setIsVisible,
  imgSizeOver,
}: IProps) => {
  useEffect(() => {
    setTimeout(() => setIsVisible(false), 3000);
  }, []);

  return (
    <Wrap
      isVisible={isVisible}
      isError={imgSizeOver}
      id={id}
      className={className}
    >
      {children}
    </Wrap>
  );
};

export default ToastMsg;

interface IWrap {
  isVisible: boolean;
  isError?: boolean;
}
const Wrap = styled.div<IWrap>`
  position: fixed;
  display: table;
  left: 50%;
  margin-left: -13.6rem;
  z-index: 100;

  width: 27.2rem;
  height: 6.6rem;
  border-radius: 3.3rem;
  ${({ theme }) => theme.media.tablet`
    width: 23rem;
    height: 5.9rem;
    border-radius: 2.95rem;
    margin-left: -11.5rem;
  `}

  background: var(--white);
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.28);

  display: ${(props) => (props.isVisible ? "flex" : "none")};
  align-items: center;
  justify-content: center;

  color: var(--black_1);
  font-size: 1.6rem;
  font-weight: 500;

  opacity: 0;
  animation: ${(props) =>
    props.isError
      ? toastmsgAnimation.ErrorFadeInOutRule
      : toastmsgAnimation.fadeInOutRule};
  animation-fill-mode: forwards;
`;
