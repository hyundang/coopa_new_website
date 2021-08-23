import { toastmsgAnimation } from "@components/animations";
import { useEffect } from "react";
import styled from "styled-components";

export interface ToastMsgProps {
  /** id */
  id?: string;
  /** className */
  className?: string;
  /** 토스트 메시지 */
  children: React.ReactNode;
  /** 토스트 메시지 렌더링 여부 */
  isVisible: boolean;
  /** isVisible set 함수 */
  setIsVisible: (e: boolean) => void;
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
}: ToastMsgProps) => {
  useEffect(() => {
    isVisible && setTimeout(() => setIsVisible(false), 3000);
  }, [isVisible]);

  return (
    <ToastMsgWrap
      isVisible={isVisible}
      isError={imgSizeOver}
      id={id}
      className={className}
    >
      {children}
    </ToastMsgWrap>
  );
};

export default ToastMsg;

interface ToastMsgWrapProps {
  isVisible: boolean;
  isError?: boolean;
}
const ToastMsgWrap = styled.dialog<ToastMsgWrapProps>`
  all: unset;
  box-sizing: border-box;
  position: fixed;
  display: table;
  left: 50%;
  margin-left: -136px;
  z-index: 100;

  width: 272px;
  height: 66px;
  border-radius: 33px;
  ${({ theme }) => theme.media.tablet`
    width: 230px;
    height: 59px;
    border-radius: 29.5px;
    margin-left: -115px;
  `}

  background: var(--white);
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.28);

  display: ${(props) => (props.isVisible ? "flex" : "none")};
  align-items: center;
  justify-content: center;

  color: var(--black_1);
  font-size: 16px;
  font-weight: 500;

  opacity: 0;
  animation: ${(props) =>
    props.isError
      ? toastmsgAnimation.ErrorFadeInOutRule
      : toastmsgAnimation.fadeInOutRule};
  animation-fill-mode: forwards;
`;
