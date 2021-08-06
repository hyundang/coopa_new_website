import { modalAnimation } from "@components/animations";
import { Dispatch, SetStateAction } from "react";
import styled, { css } from "styled-components";

export interface ModalProps {
  /** id */
  id?: string;
  /** className */
  className?: string;
  /** modal 안에 들어가는 것 */
  children?: React.ReactNode;
  /** 모달 오픈 여부 */
  isOpen: boolean;
  /** 모달 오픈 setState */
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  /** background color */
  backgroundColor?: "black" | "white";
}
const Modal = ({
  id,
  className,
  children,
  isOpen,
  setIsOpen,
  backgroundColor = "black",
}: ModalProps) => {
  return (
    <>
      {isOpen && (
        <>
          <Background
            onClick={() => setIsOpen(false)}
            backgroundColor={backgroundColor}
          />
          <ModalWrap id={id} className={className} isOpen={isOpen}>
            {children}
          </ModalWrap>
        </>
      )}
    </>
  );
};

export default Modal;

interface BackgroundProps {
  backgroundColor: "black" | "white";
}
const Background = styled.div<BackgroundProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  width: 100vw;
  height: 100vh;

  background-color: ${(props) =>
    props.backgroundColor === "white" ? undefined : "rgba(0, 0, 0, 0.4)"};
`;

interface ModalWrapProps {
  isOpen: boolean;
}
const ModalWrap = styled.div<ModalWrapProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 11;
  transform: translate(-50%, -50%);
  background-color: var(--white);

  display: flex;
  flex-direction: column;
  color: var(--black_1);

  ${(props) =>
    props.isOpen
      ? css`
          ${({ theme }) => theme.media.tablet`
                animation: ${modalAnimation.tabletFadeInRule};
            `}
        `
      : css`
          ${({ theme }) => theme.media.tablet`
                animation: ${modalAnimation.tabletFadeOutRule};
            `}
        `}
`;
