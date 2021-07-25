import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import styled from "styled-components";
import Btn from "@components/atoms/Btn/Btn";
import InputForm from "@components/molecules/InputForm/InputForm";
import TextAreaForm from "@components/molecules/TextAreaForm/TextAreaForm";
import ImgBoxForm from "@components/molecules/ImgBoxForm/ImgBoxForm";

/** !쿠키 1개에 대한 export interface 만들어서 사용하기! */
interface ValueProps {
  title: string;
  content: string;
  thumbnail: string;
  cookieId: number | string;
  image?: File;
}
export interface CookieEditModalProps {
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
  /** 모달 open 여부 setState */
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  /** data post 시 loading 여부 */
  isLoading: boolean;
}

const CookieEditModal = ({
  value,
  setValue,
  onClickSave,
  onClickDel,
  setIsError,
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <>
      <Background onClick={() => setIsOpen(false)} />
      <Container className="cookie_edit_modal_container">
        <div className="modal_title">쿠키 수정</div>
        <div className="modal_img_box_wrap">
          <div className="modal_img_box_wrap__text">쿠키 이미지 업로드</div>
          <ImgBoxForm
            imgBoxStyle={{
              width: "270px",
              height: "136px",
              borderRadius: "16px",
              border: isLoading ? undefined : "1px solid var(--gray_4)",
            }}
            imgUrl={value.thumbnail}
            isHover={isHover}
            setIsHover={setIsHover}
            isLoading={isLoading}
            plusSize={24}
            cookieSize={40}
            ref={img_input}
            onChangeImg={handleChangeImg}
          />
        </div>
        <InputForm
          inputStyle={{
            height: "46px",
            borderRadius: "12px",
            fontSize: "15px",
          }}
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
        />
        <div style={{ height: "26px" }} />
        <TextAreaForm
          textareaStyle={{
            height: "99px",
            borderRadius: "10px",
            fontSize: "15px",
          }}
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
        <div style={{ flex: 1 }} />
        <div className="btn_wrap">
          <Btn
            Style={{
              width: "70px",
              height: "48px",
              borderRadius: "24px",
              fontSize: "16px",
            }}
            onClick={onClickDel}
          >
            삭제
          </Btn>
          <span className="btn_wrap__inner_wrap">
            <Btn
              Style={{
                width: "70px",
                height: "48px",
                borderRadius: "24px",
                fontSize: "16px",
              }}
              onClick={() => setIsOpen(false)}
            >
              취소
            </Btn>
            <Btn
              Style={{
                width: "70px",
                height: "48px",
                borderRadius: "24px",
                fontSize: "16px",
              }}
              isOrange
              onClick={onClickSave}
            >
              수정
            </Btn>
          </span>
        </div>
      </Container>
    </>
  );
};

export default CookieEditModal;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  background-color: rgba(0, 0, 0, 0.8);
  width: 100vw;
  height: 100vh;
`;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 11;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding: 34px 32px 38px 32px;
  border-radius: 16px;
  background-color: var(--white);
  width: 516px;
  height: 631px;

  color: var(--black_1);

  .modal_title {
    margin-bottom: 16px;
    width: 100%;
    height: 36px;

    font-weight: 500;
    font-size: 20px;
    line-height: 36px;
  }

  .modal_img_box_wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 25px;
    width: 100%;
    &__text {
      margin-bottom: 10px;
      width: 100%;
      font-weight: 400;
      font-size: 13px;
      line-height: 16px;
    }
  }

  .btn_wrap {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    &__inner_wrap {
      width: 148px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
`;
