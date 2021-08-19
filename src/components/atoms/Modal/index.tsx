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
  /** 모달 wrap click event handler */
  onClick?: React.MouseEventHandler<HTMLDialogElement>;
}
const Modal = ({
  id,
  className,
  children,
  isOpen,
  setIsOpen,
  onClick,
}: ModalProps) => {
  return (
    <>
      {isOpen && (
        <>
          <Background
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          />
          <ModalWrap
            id={id}
            className={className}
            isOpen={isOpen}
            onClick={onClick}
          >
            {children}
          </ModalWrap>
        </>
      )}
    </>
  );
};

export default Modal;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.4);
`;

interface ModalWrapProps {
  isOpen: boolean;
}
const ModalWrap = styled.dialog<ModalWrapProps>`
  all: unset;
  box-sizing: border-box;
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
          ${({ theme }) => theme.media.mobile`
                animation: ${modalAnimation.mobileFadeInRule};
            `}
        `
      : css`
          ${({ theme }) => theme.media.mobile`
                animation: ${modalAnimation.mobileFadeOutRule};
            `}
        `}
`;
