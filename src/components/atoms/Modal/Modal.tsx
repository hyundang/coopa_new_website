import { Dispatch, SetStateAction } from "react";
import styled, { css } from "styled-components";
import {
  homeboardFadeInRule,
  homeboardFadeOutRule,
  tabletFadeInRule,
  tabletFadeOutRule,
} from "@components/animations/Modal";

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
  /** pc css (width, height, fontSize...) */
  pcStyle?: React.CSSProperties;
  /** tablet css (width, height, fontSize...) */
  tabletStyle?: React.CSSProperties;
  /** 홈보드 수정 모달 여부 */
  isHomeboardEditModal?: boolean;
  /** 위치 고정 여부 */
  isFixed?: boolean;
  /** x좌표 */
  locationX?: number;
}
const Modal = ({
  id,
  className,
  children,
  isOpen,
  setIsOpen,
  pcStyle,
  tabletStyle,
  isHomeboardEditModal,
  isFixed = true,
  locationX,
}: ModalProps) => {
  return (
    <>
      <Background onClick={() => setIsOpen(false)} isFixed={isFixed} />
      <ModalWrap
        id={id}
        className={className}
        pcStyle={pcStyle}
        tabletStyle={tabletStyle}
        isHomeboardEditModal={isHomeboardEditModal}
        isOpen={isOpen}
        isFixed={isFixed}
        locationX={locationX}
      >
        {children}
      </ModalWrap>
    </>
  );
};

export default Modal;

interface BackgroundProps {
  isFixed?: boolean;
}
const Background = styled.div<BackgroundProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  width: 100vw;
  height: 100vh;

  background-color: ${(props) => (props.isFixed ? "rgba(0,0,0,0.4)" : "none")};
`;

interface ModalWrapProps {
  /** pc css (width, height, fontSize...) */
  pcStyle?: React.CSSProperties;
  /** tablet css (width, height, fontSize...) */
  tabletStyle?: React.CSSProperties;
  /** 홈보드 수정 모달 여부 */
  isHomeboardEditModal?: boolean;
  /** 모달 오픈 여부 */
  isOpen: boolean;
  /** 위치 고정 여부 */
  isFixed?: boolean;
  /** x좌표 */
  locationX?: number;
}
const ModalWrap = styled.div<ModalWrapProps>`
  ${(props) =>
    props.isFixed
      ? css`
          position: fixed;
          top: 50%;
          left: 50%;
          z-index: 11;
          transform: translate(-50%, -50%);
        `
      : css`
          position: absolute;
          top: ${props.pcStyle?.top};
          left: ${props.locationX}px;
          z-index: 11;
        `}

  ${(props) =>
    props.isHomeboardEditModal &&
    css`
      transition: visibility 0.4s;
      visibility: ${props.isOpen ? `visible` : `hidden`};
      animation: ${props.isOpen ? homeboardFadeInRule : homeboardFadeOutRule};
    `}

  width: ${(props) => props.pcStyle?.width};
  height: ${(props) => props.pcStyle?.height};
  padding: ${(props) => props.pcStyle?.padding};
  border-radius: ${(props) => props.pcStyle?.borderRadius};
  background-color: var(--white);
  box-shadow: ${(props) => props.pcStyle?.boxShadow};

  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
  align-items: ${(props) => props.pcStyle?.alignItems};

  font-size: ${(props) => props.pcStyle?.fontSize};
  font-weight: ${(props) => props.pcStyle?.fontWeight};
  color: ${(props) => props.pcStyle?.color};

  ${({ theme }) => theme.media.tablet`
    top: 100%;
    transform: translate(-50%, -100%);

    width: 100%;
    overflow-y: scroll;
  `}

  ${(props) =>
    props.isOpen
      ? css`
          ${({ theme }) => theme.media.tablet`
                animation: ${tabletFadeInRule};
                height: ${props.tabletStyle?.height};
                padding: ${props.tabletStyle?.padding};
                border-radius: ${props.tabletStyle?.borderRadius};
            `}
        `
      : css`
          ${({ theme }) => theme.media.tablet`
                animation: ${tabletFadeOutRule};
                height: ${props.tabletStyle?.height};
                padding: ${props.tabletStyle?.padding};
                border-radius: ${props.tabletStyle?.borderRadius};
            `}
        `}
`;
