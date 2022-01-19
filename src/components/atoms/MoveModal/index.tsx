import React, {
  DialogHTMLAttributes,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import styled from "styled-components";

export interface MoveModalProps
  extends DialogHTMLAttributes<HTMLDialogElement> {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const MoveModal = ({
  id,
  className,
  children,
  isOpen,
  setIsOpen,
}: MoveModalProps) => {
  const modal = useRef<HTMLDialogElement>(null);

  // 모달 바깥 영역 클릭 감지
  const handleCloseModal = (e: any) => {
    if (!isOpen && (!modal.current || !modal.current.contains(e.target)))
      setIsOpen(false);
  };
  const handleKeyDown = (e: any) => {
    e.key === "Escape" && setIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleCloseModal);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("mousedown", handleCloseModal);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <MoveModalWrap id={id} className={className} ref={modal}>
      {children}
    </MoveModalWrap>
  );
};

export default MoveModal;

const MoveModalWrap = styled.dialog`
  all: unset;
  box-sizing: border-box;
  position: absolute;
  background-color: var(--white);
  color: var(--black_1);
`;
