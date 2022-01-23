import { modalAnimation } from "@components/animations";
import { Btn, Input, MoveModal } from "@components/atoms";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styled, { css } from "styled-components";

export interface CookieAddModalProps {
  id?: string;
  className?: string;
  type: "cookie" | "dirDetail";
  /** modal open */
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  locationX: number;
  createCookie: (url: string) => Promise<boolean>;
}
const CookieAddModal = ({
  id,
  className,
  isOpen,
  setIsOpen,
  locationX,
  type,
  createCookie,
}: CookieAddModalProps) => {
  const link_input = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>("");

  // enter 키 클릭 시
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && handleClickAddBtn();
  };
  // esc 키 클릭 시
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleClickAddBtn = () => {
    value !== ""
      ? (async () => {
          // 링크로 부터 데이터 얻기, post cookie
          const res = await createCookie(value);
          res ? setIsOpen(false) : link_input.current?.focus();
        })()
      : link_input.current?.focus();
  };

  // 제일 처음에 link input focus 상태로 설정
  useEffect(() => {
    isOpen &&
      setTimeout(() => {
        link_input.current?.focus();
      }, 300);
  }, [isOpen]);

  return (
    <CookieAddModalWrap
      id={id}
      className={className}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      locationX={locationX}
      type={type}
    >
      <h1 className="modal-title">쿠키 추가</h1>
      <Input
        className="input-link"
        placeholder="URL을 입력해주세요"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onKeyPress={handleKeyPress}
        ref={link_input}
      />
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
          onClick={handleClickAddBtn}
        >
          추가
        </Btn>
      </div>
    </CookieAddModalWrap>
  );
};

export default CookieAddModal;

interface CookieAddModalWrapProps {
  locationX: number;
  type: "cookie" | "dirDetail";
}
const CookieAddModalWrap = styled(MoveModal)<CookieAddModalWrapProps>`
  position: absolute;
  top: ${({ type }) => (type === "cookie" ? 412 : 287)}px;
  left: ${({ locationX }) => locationX}px;
  z-index: 3;

  width: 484px;
  height: 197px;
  padding: 19px 16px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.13);
  border-radius: 20px;

  display: flex;
  flex-direction: column;

  ${({ theme, type }) => theme.media.tablet`
    top: ${type === "cookie" ? 205 : 287}px;
  `}

  ${({ theme, isOpen }) => theme.media.mobile`
    position: fixed;
    top: 100%;
    left: 50%;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
    transform: translate(-50%, -100%);
    ${
      isOpen
        ? css`
            animation: ${modalAnimation.mobileFadeInRule};
          `
        : css`
            animation: ${modalAnimation.mobileFadeOutRule};
          `
    }
    width: 100%;
    height: 35%;
    overflow-y: scroll;
    padding: 32px 20px 28px 20px;
    border-radius: 20px 20px 0px 0px;
  `}

  transition: 0.4s all;
  ${({ isOpen }) =>
    isOpen
      ? css`
          opacity: 1;
          visibility: visible;
          animation: ${modalAnimation.notiFadeInRule};
        `
      : css`
          opacity: 0;
          visibility: hidden;
          animation: ${modalAnimation.notiFadeOutRule};
        `}

  .modal-title {
    margin: 0 0 16px 7px;
    font-weight: 500;
    font-size: 20px;
    line-height: 36px;
    color: var(--black_1);
  }

  .input-link {
    font-size: 15px;
    padding: 5px 18px;
    height: 46px;
    &::selection {
      background-color: var(--orange_sub);
    }
  }

  .button-wrap {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    .modal-button {
      width: 62px;
      height: 40px;
      border-radius: 26px;
      font-size: 15px;
    }
    #cancel {
      margin-right: 8px;
    }
  }
`;
