// components
import { Btn, Modal } from "@components/atoms";
import { ImgBoxForm, InputForm, TextAreaForm } from "@components/molecules";
// interfaces
import { UpdateCookieProps } from "@interfaces/cookie";
// libs
import { useRecoilState } from "recoil";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
// modules
import { ToastMsgState } from "@modules/states";

export interface CookieEditModalProps {
  id?: string;
  className?: string;
  value: UpdateCookieProps;
  setValue: Dispatch<SetStateAction<UpdateCookieProps>>;
  onClickDelBtn: React.MouseEventHandler<HTMLButtonElement>;
  setCardState?: Dispatch<
    SetStateAction<"hover" | "parking" | "normal" | "input">
  >;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  updateCookie: (data: UpdateCookieProps) => Promise<void>;
}

const CookieEditModal = ({
  id,
  className,
  value,
  setValue,
  onClickDelBtn,
  setCardState,
  isOpen,
  setIsOpen,
  isLoading,
  updateCookie,
}: CookieEditModalProps) => {
  // img box hover 여부
  const [isHover, setIsHover] = useState(false);
  // file input 시 file value 초기화를 위해 사용
  const cookie_img_input = useRef<HTMLInputElement>(null);

  const [isToastMsgVisible, setIsToastMsgVisible] =
    useRecoilState(ToastMsgState);

  const initializeInputTargetValue = () => {
    if (cookie_img_input.current) cookie_img_input.current.value = "";
  };

  // img input event handling 함수
  const handleChangeCookieImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files[0].size < 5000001) {
        setValue({
          ...value,
          thumbnail: URL.createObjectURL(e.target.files[0]),
          image: e.target.files[0],
        });
        initializeInputTargetValue();
      } else {
        setIsToastMsgVisible({
          ...isToastMsgVisible,
          imgSizeOver: true,
        });
        initializeInputTargetValue();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleClickUpdateBtn = async () => {
    await updateCookie(value);
    setIsOpen(false);
    setCardState ? setCardState("normal") : () => {};
  };

  return (
    <ModalWrap
      id={id}
      className={className}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isLoading={isLoading}
    >
      <h1 className="modal-title">쿠키 수정</h1>
      <span className="input-img__label">쿠키 이미지 업로드</span>
      <ImgBoxForm
        className="input-img"
        imgUrl={value.thumbnail}
        isHover={isHover}
        setIsHover={setIsHover}
        isLoading={isLoading}
        plusSize={24}
        cookieSize={40}
        ref={cookie_img_input}
        onChangeImg={handleChangeCookieImg}
      />
      <InputForm
        className="input-title"
        labelText="쿠키 제목"
        length={value.title.length}
        maxLength={45}
        placeholder="쿠키 제목을 입력해주세요"
        value={value.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          e.target.value.length < 46
            ? setValue({
                ...value,
                title: e.target.value,
              })
            : () => {}
        }
        onKeyDown={handleKeyDown}
      />
      <TextAreaForm
        className="input-text"
        labelText="쿠키 텍스트"
        length={value.content.length}
        maxLength={200}
        placeholder="나만의 코멘트나 메모를 남겨주세요"
        value={value.content}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          e.target.value.length < 201
            ? setValue({
                ...value,
                content: e.target.value,
              })
            : () => {}
        }
        onKeyDown={handleKeyDown}
      />
      <div style={{ flexGrow: 1, width: "100%" }} />
      <div className="button-wrap">
        <Btn className="button" isAtvBtn onClick={onClickDelBtn}>
          삭제
        </Btn>
        <span className="button-wrap__inner">
          <Btn className="button" isAtvBtn onClick={() => setIsOpen(false)}>
            취소
          </Btn>
          <Btn
            className="button"
            isOrange
            isAtvBtn
            onClick={handleClickUpdateBtn}
          >
            수정
          </Btn>
        </span>
      </div>
    </ModalWrap>
  );
};

export default CookieEditModal;

interface ModalWrapProps {
  isLoading: boolean;
}
const ModalWrap = styled(Modal)<ModalWrapProps>`
  width: 516px;
  height: 631px;
  padding: 34px 32px 38px 32px;
  border-radius: 16px;
  align-items: flex-start;

  ${({ theme }) => theme.media.mobile`
    top: 100%;
    transform: translate(-50%, -100%);
    width: 100%;
    height: 95%;
    overflow-y: scroll;
    padding: 32px 20px 28px 20px;
    border-radius: 20px 20px 0px 0px;
  `}

  .modal-title {
    margin-bottom: 16px;
    width: 100%;
    height: 36px;

    font-weight: 500;
    font-size: 20px;
    line-height: 36px;
  }

  .input-img__label {
    margin-bottom: 10px;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
  }
  .input-img {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 25px;
    width: 100%;
    .img-box {
      width: 270px;
      height: 136px;
      border-radius: 16px;
      border: ${(props) =>
        props.isLoading ? undefined : "1px solid var(--gray_4)"};
    }
  }

  .input-title {
    margin-bottom: 26px;
    #input {
      height: 46px;
      border-radius: 12px;
      font-size: 15px;
    }
  }
  .input-text {
    #textarea {
      height: 99px;
      border-radius: 10px;
      font-size: 15px;
    }
  }

  .button {
    width: 70px;
    height: 48px;
    border-radius: 24px;
    font-size: 16px;
  }
  .button-wrap {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &__inner {
      width: 148px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
`;
