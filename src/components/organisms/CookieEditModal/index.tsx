import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { Btn, Modal } from "@components/atoms";
import { ImgBoxForm, InputForm, TextAreaForm } from "@components/molecules";
import { modalAnimation } from "@components/animations";

/** !쿠키 1개에 대한 export interface 만들어서 사용하기! */
interface ValueProps {
  title: string;
  content: string;
  thumbnail: string;
  cookieId: number | string;
  image?: File;
}
export interface CookieEditModalProps {
  /** id */
  id?: string;
  /** className */
  className?: string;
  /** 쿠키 제목, 쿠키 텍스트, 쿠키 썸네일, 쿠키 아이디, 쿠키 썸네일 파일 */
  value: ValueProps;
  /** 쿠키 제목, 쿠키 텍스트, 쿠키 썸네일 setState */
  setValue: Dispatch<SetStateAction<ValueProps>>;
  /** '저장' 버튼 클릭 시 event handling 함수 */
  onClickSave: React.MouseEventHandler<HTMLButtonElement>;
  /** '삭제' 버튼 클릭 시 event handling 함수 */
  onClickDel: React.MouseEventHandler<HTMLButtonElement>;
  /** img input 시 img size 에러 여부 setState */
  setIsError: Dispatch<SetStateAction<boolean>>;
  /** 모달 open 여부 */
  isOpen: boolean;
  /** 모달 open 여부 setState */
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  /** data post 시 loading 여부 */
  isLoading: boolean;
}

const CookieEditModal = ({
  id,
  className,
  value,
  setValue,
  onClickSave,
  onClickDel,
  setIsError,
  isOpen,
  setIsOpen,
  isLoading,
}: CookieEditModalProps) => {
  // img box hover 여부
  const [isHover, setIsHover] = useState(false);
  // file input 시 file value 초기화를 위해 사용
  const img_input = useRef(document.createElement("input"));

  // img input event handling 함수
  const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files[0].size < 5000001) {
        setValue({
          ...value,
          thumbnail: URL.createObjectURL(e.target.files[0]),
          image: e.target.files[0],
        });
      } else {
        setIsError(true);
        img_input.current.value = "";
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
        ref={img_input}
        onChangeImg={handleChangeImg}
      />
      <InputForm
        className="input-title"
        text="쿠키 제목"
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
        text="쿠키 텍스트"
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
        <Btn className="button" onClick={onClickDel}>
          삭제
        </Btn>
        <span className="button-wrap__inner">
          <Btn className="button" onClick={() => setIsOpen(false)}>
            취소
          </Btn>
          <Btn className="button" isOrange onClick={onClickSave}>
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
