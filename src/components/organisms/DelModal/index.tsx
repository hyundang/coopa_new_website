import { PlusIcon } from "@assets/icons/common";
import { Btn, Icon, Modal } from "@components/atoms";
import { InputForm } from "@components/molecules";
import { Dispatch, SetStateAction, useState } from "react";
import styled, { css } from "styled-components";

export interface DelModalProps {
  id?: string;
  className?: string;
  /** modal type */
  type?: "cookie" | "directory";
  /** modal open */
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  /** delete cookie or directory data */
  onClickDel: () => void;
}
const DelModal = ({
  id,
  className,
  type = "cookie",
  isOpen,
  setIsOpen,
  onClickDel,
}: DelModalProps) => {
  return (
    <DelModalWrap
      id={id}
      className={className}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <h1 className="modal-title">
        {type === "cookie" ? "쿠키" : "디렉토리"} 삭제
      </h1>
      <span className="modal-desc">
        {type === "cookie"
          ? "이 쿠키를 삭제할까요?"
          : "포함된 모든 쿠키가 삭제돼요! 삭제하시겠어요?"}
      </span>
      <div style={{ flexGrow: 1, width: "100%" }} />
      <div className="button-wrap">
        <Btn
          id="cancel"
          className="modal-button"
          isAtvBtn
          onClick={() => setIsOpen(false)}
        >
          취소
        </Btn>
        <Btn
          className="modal-button"
          isAtvBtn
          isOrange
          onClick={() => {
            onClickDel();
            setIsOpen(false);
          }}
        >
          삭제
        </Btn>
      </div>
    </DelModalWrap>
  );
};

export default DelModal;

const DelModalWrap = styled(Modal)`
  width: 400px;
  height: 200px;
  padding: 34px 32px;
  border-radius: 20px;

  ${({ theme }) => theme.media.mobile`
    top: 100%;
    transform: translate(-50%, -100%);
    width: 100%;
    height: 25%;
    overflow-y: scroll;
    padding: 32px 20px 28px 20px;
    border-radius: 20px 20px 0px 0px;
  `}

  .modal-title {
    margin: 0;
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 20px;
    line-height: 36px;
    color: var(--black_1);
  }
  .modal-desc {
    margin-bottom: 10px;
    font-size: 15px;
    line-height: 16px;
    color: var(--black_1);
  }

  .button-wrap {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    .modal-button {
      width: 70px;
      height: 48px;
      border-radius: 26px;
      font-size: 16px;
    }
    #cancel {
      margin-right: 10px;
    }
  }
`;
