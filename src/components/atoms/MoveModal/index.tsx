import { useEffect, useRef } from "react";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

export interface MoveModalProps {
  /** id */
  id?: string;
  /** className */
  className?: string;
  /** 내부 */
  children: React.ReactNode;
  /** 모달 open 여부 */
  isOpen: boolean;
  /** 모달 open 여부 setState */
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

  useEffect(() => {
    window.addEventListener("mousedown", handleCloseModal);
    return () => {
      window.removeEventListener("mousedown", handleCloseModal);
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
