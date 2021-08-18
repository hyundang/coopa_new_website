import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { Btn, Modal } from "@components/atoms";
import { InputForm, TextAreaForm } from "@components/molecules";
import { PostUserDataProps } from "@interfaces/user";

export interface ProfileEditModalProps {
  /** id */
  id?: string;
  /** className */
  className?: string;
  /** 닉네임, 자기소개 */
  value: PostUserDataProps;
  /** 닉네임, 자기소개 setState */
  setValue: Dispatch<SetStateAction<PostUserDataProps>>;
  /** '수정' 버튼 클릭 시 event handling 함수 */
  onClickEdit: React.MouseEventHandler<HTMLButtonElement>;
  /** 모달 open 여부 */
  isOpen: boolean;
  /** 모달 open 여부 setState */
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  /** data post 시 loading 여부 */
  isLoading: boolean;
}

const ProfileEditModal = ({
  id,
  className,
  value,
  setValue,
  onClickEdit,
  isOpen,
  setIsOpen,
  isLoading,
}: ProfileEditModalProps) => {
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
      <h1 className="modal-title">프로필 편집</h1>
      <InputForm
        className="input-nickname"
        text="닉네임"
        length={value.name.length}
        maxLength={20}
        placeholder="닉네임을 입력해주세요"
        value={value.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          e.target.value.length < 21
            ? setValue({
                ...value,
                name: e.target.value,
              })
            : () => {}
        }
        onKeyDown={handleKeyDown}
      />
      <TextAreaForm
        className="input-text"
        text="한 줄 소개"
        length={value.introduction ? value.introduction.length : 0}
        maxLength={70}
        placeholder="나만의 한 줄 소개를 입력해주세요"
        value={value.introduction}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          e.target.value.length < 71
            ? setValue({
                ...value,
                introduction: e.target.value,
              })
            : () => {}
        }
        onKeyDown={handleKeyDown}
      />
      <div style={{ flexGrow: 1, width: "100%" }} />
      <div className="button-wrap">
        <Btn className="button" onClick={() => setIsOpen(false)}>
          취소
        </Btn>
        <Btn className="button" isOrange onClick={onClickEdit}>
          확인
        </Btn>
      </div>
    </ModalWrap>
  );
};

export default ProfileEditModal;

interface ModalWrapProps {
  isLoading: boolean;
}
const ModalWrap = styled(Modal)<ModalWrapProps>`
  width: 520px;
  height: 424px;
  padding: 34px 32px 38px 32px;
  border-radius: 16px;
  align-items: flex-end;

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
    margin: 0;
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

  .input-nickname {
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
    width: 150px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
