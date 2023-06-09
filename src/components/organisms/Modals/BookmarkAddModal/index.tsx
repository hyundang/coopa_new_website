import { Btn, Input, MoveModal } from "@components/atoms";
import { modalAnimation } from "@components/animations";
import { CreateBookmarkProps } from "@interfaces/homeboard";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import styled, { css } from "styled-components";

export interface BookmarkAddModalProps {
  id?: string;
  className?: string;
  value: CreateBookmarkProps;
  setValue: Dispatch<SetStateAction<CreateBookmarkProps>>;
  onClickCreateBtn: (link: string) => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  locationX: number;
}

const BookmarkAddModal = ({
  id,
  className,
  value,
  setValue,
  onClickCreateBtn,
  isOpen,
  setIsOpen,
  locationX,
}: BookmarkAddModalProps) => {
  // for input refs
  const link_input = useRef<HTMLInputElement>(null);
  const name_input = useRef<HTMLInputElement>(null);

  const initializeModal = () => {
    setTimeout(() => {
      link_input.current?.focus();
    }, 300);
    setValue({
      name: "",
      link: "",
    });
  };

  const createBookmark = () => {
    let { link } = value;
    if (link[link.length - 1] !== "/") link = `${link}/`;
    if (!link.includes("https://")) link = `https://${value.link}`;
    onClickCreateBtn(link);
    setIsOpen(false);
  };

  // 생성 클릭시
  const handleClickCreateBtn = () => {
    value.link !== ""
      ? value.name !== ""
        ? createBookmark()
        : name_input.current?.focus()
      : link_input.current?.focus();
  };

  // enter 키 클릭 시
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && handleClickCreateBtn();
  };
  // esc 키 클릭 시
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  // 제일 처음에 link input focus 상태로 설정
  useEffect(() => {
    isOpen && initializeModal();
  }, [isOpen]);

  return (
    <ModalWrap
      id={id}
      className={className}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      locationX={locationX}
    >
      <h1 className="modal-title">즐겨찾기 추가</h1>
      <Input
        className="input"
        placeholder="URL을 입력해주세요"
        value={value.link}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue({
            ...value,
            link: e.target.value,
          })
        }
        ref={link_input}
        onKeyDown={handleKeyDown}
        onKeyPress={handleKeyPress}
      />
      <Input
        id="input-title"
        className="input"
        placeholder="제목을 입력해주세요"
        value={value.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue({
            ...value,
            name: e.target.value,
          })
        }
        ref={name_input}
        onKeyDown={handleKeyDown}
        onKeyPress={handleKeyPress}
      />
      <div className="button">
        <Btn
          className="button__cancel"
          isAtvBtn
          onClick={() => setIsOpen(false)}
        >
          취소
        </Btn>
        <Btn
          className="button__edit"
          isOrange
          isAtvBtn
          onClick={handleClickCreateBtn}
        >
          추가
        </Btn>
      </div>
    </ModalWrap>
  );
};

export default BookmarkAddModal;

interface ModalWrapProps {
  locationX: number;
}
const ModalWrap = styled(MoveModal)<ModalWrapProps>`
  top: 86px;
  right: ${(props) => props.locationX}px;
  z-index: 3;

  width: 300px;
  height: 200px;
  padding: 20px 16px;
  border-radius: 20px;
  box-shadow: 0px 0px 13px rgba(0, 0, 0, 0.15);

  display: flex;
  align-items: flex-start;
  flex-direction: column;

  transition: 0.4s all;
  ${({ isOpen }) =>
    isOpen
      ? css`
          opacity: 1;
          visibility: visible;
          animation: ${modalAnimation.homeboardFadeInRule};
        `
      : css`
          opacity: 0;
          visibility: hidden;
          animation: ${modalAnimation.homeboardFadeOutRule};
        `}

  .modal-title {
    margin-bottom: 12px;
    width: 100%;
    height: 18px;

    font-weight: 500;
    font-size: 15px;
    line-height: 19px;
  }

  .input {
    height: 35px;
    margin-bottom: 8px;
    border-radius: 10px;
    font-size: 13px;
  }
  #input_title {
    margin-bottom: 12px;
  }

  .button {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    &__cancel {
      width: 62px;
      height: 40px;
      margin-right: 8px;
      border-radius: 26px;
      font-size: 15px;
    }
    &__edit {
      width: 62px;
      height: 40px;
      border-radius: 26px;
      font-size: 15px;
    }
  }
`;
