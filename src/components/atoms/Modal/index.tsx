import { modalAnimation } from "@components/animations";
import React, {
  DialogHTMLAttributes,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import styled, { css } from "styled-components";

export interface ModalProps extends DialogHTMLAttributes<HTMLDialogElement> {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const Modal = ({
  id,
  className,
  children,
  isOpen,
  setIsOpen,
  onClick,
}: ModalProps) => {
  const handleKeyDown = (e: any) => {
    e.key === "Escape" && setIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
            onClick={(e) => {
              e.stopPropagation();
              onClick ? onClick(e) : () => {};
            }}
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
