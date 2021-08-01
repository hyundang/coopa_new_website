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
import Modal from "@components/atoms/Modal/Modal";

interface ValueProps {
  name: string;
  link: string;
}
export interface CookieEditModalProps {
  /** id */
  id?: string;
  /** className */
  className?: string;
  /** 즐겨찾기 제목, 즐겨찾기 링크 */
  value: ValueProps;
  /** 즐겨찾기 제목, 즐겨찾기 링크 setState */
  setValue: Dispatch<SetStateAction<ValueProps>>;
  /** '저장' 버튼 클릭 시 event handling 함수 */
  onClickSave: () => void;
  /** 모달 open 여부 */
  isOpen: boolean;
  /** 모달 open 여부 setState */
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const CookieEditModal = ({
  id,
  className,
  value,
  setValue,
  onClickSave,
  isOpen,
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
    <Modal
      id={id}
      className={className}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isFixed={false}
      locationX={50}
      pcStyle={{
        alignItems: "flex-start",
        padding: " 20px 16px",
        borderRadius: "20px",
        boxShadow: "0px 0px 13px rgba(0, 0, 0, 0.15)",
        width: "300px",
        height: "200px",
        color: "var(--black_1)",
      }}
    >
      <Container>
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
    </Modal>
  );
};

export default CookieEditModal;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

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
