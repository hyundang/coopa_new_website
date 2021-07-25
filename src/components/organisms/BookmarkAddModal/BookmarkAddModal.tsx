import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import Btn from "@components/atoms/Btn/Btn";
import Input from "@components/atoms/Input/Input";

interface ValueProps {
  name: string;
  link: string;
}
export interface CookieEditModalProps {
  /** 즐겨찾기 제목, 즐겨찾기 링크 */
  value: ValueProps;
  /** 즐겨찾기 제목, 즐겨찾기 링크 setState */
  setValue: Dispatch<SetStateAction<ValueProps>>;
  /** '저장' 버튼 클릭 시 event handling 함수 */
  onClickSave: () => void;
  /** 모달 open 여부 setState */
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const CookieEditModal = ({
  value,
  setValue,
  onClickSave,
  setIsOpen,
}: CookieEditModalProps) => {
  // for input refs
  const link_input = useRef<HTMLInputElement>(null);
  const name_input = useRef<HTMLInputElement>(null);
  // '수정' 버튼 활성화 여부
  const [isBtnAtv, setIsBtnAtv] = useState(false);

  // 
  const handleClickSave = () => {
    isBtnAtv
      ? onClickSave()
      : value.link === ""
      ? link_input.current?.focus()
      : name_input.current?.focus();
  };

  // enter 키 클릭 시
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && handleClickSave();
  };
  // esc 키 클릭 시
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  // '수정' 버튼 활성화 여부 판단
  useEffect(() => {
    value.link !== "" && value.name !== ""
      ? setIsBtnAtv(true)
      : setIsBtnAtv(false);
  }, [value]);

  // 제일 처음에 link input focus 상태로 설정
  useEffect(() => {
    link_input.current?.focus();
  }, []);

  return (
    <>
      <Background onClick={() => setIsOpen(false)} />
      <Container className="bookmark_add_modal_container">
        <div className="modal_title">즐겨찾기 추가</div>
        <Input
          style={{
            height: "35px",
            borderRadius: "10px",
            fontSize: "13px",
          }}
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
        <div style={{ height: "8px" }} />
        <Input
          style={{
            height: "35px",
            borderRadius: "10px",
            fontSize: "13px",
          }}
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
        <div className="btn_wrap">
          <Btn
            Style={{
              width: "62px",
              height: "40px",
              borderRadius: "26px",
              fontSize: "15px",
            }}
            onClick={() => setIsOpen(false)}
          >
            취소
          </Btn>
          <div style={{ width: "8px" }} />
          <Btn
            Style={{
              width: "62px",
              height: "40px",
              borderRadius: "26px",
              fontSize: "15px",
            }}
            isOrange
            onClick={handleClickSave}
          >
            수정
          </Btn>
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

  padding: 20px 16px;
  border-radius: 20px;
  background-color: var(--white);
  box-shadow: 0px 0px 13px rgba(0, 0, 0, 0.15);
  width: 300px;
  height: 200px;

  color: var(--black_1);

  .modal_title {
    margin-bottom: 12px;
    width: 100%;
    height: 18px;

    font-weight: 500;
    font-size: 15px;
    line-height: 19px;
  }

  .btn_wrap {
    margin-top: 12px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
`;
