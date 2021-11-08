import { PlusIcon } from "@assets/icons/common";
import { Btn, Icon, Modal } from "@components/atoms";
import { InputForm } from "@components/molecules";
import { PostDirectoryProps } from "@interfaces/directory";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import dynamic from "next/dynamic";
import { useWindowSize } from "src/hooks";

const Picker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
});

export interface DirectoryModalProps {
  id?: string;
  className?: string;
  /** modal type */
  type?: "new" | "edit";
  /** modal open */
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  /** post directory data */
  postDir?: (e: PostDirectoryProps) => void;
  /** put directory data */
  putDir?: (dirId: number, e: PostDirectoryProps) => Promise<void>;
  /** delete directory data */
  delDir?: () => void;
  /** directory Data */
  initValue?: PostDirectoryProps;
  dirId?: number;
}
const DirectoryModal = ({
  id,
  className,
  type = "new",
  isOpen,
  setIsOpen,
  postDir,
  putDir,
  delDir,
  initValue,
  dirId,
}: DirectoryModalProps) => {
  const size = useWindowSize();
  // for emoji picker
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const pickerStyle = {
    width:
      size.width !== undefined
        ? size?.width <= 600
          ? "100%"
          : "360px"
        : "100%",
    height: "390px",
    borderRaduis: "12px",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
  };

  // 새 디렉토리 데이터
  const [value, setValue] = useState<PostDirectoryProps>({
    emoji: "",
    name: "",
  });

  const name_input = useRef<HTMLInputElement>(null);

  // enter 키 클릭 시
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && handleClickButton();
  };
  // esc 키 클릭 시
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleClickButton = () => {
    value.name !== ""
      ? (() => {
          type === "new"
            ? postDir && postDir(value)
            : putDir && dirId && putDir(dirId, value);
          setIsOpen(false);
        })()
      : name_input.current?.focus();
  };

  // 제일 처음에 link input focus 상태로 설정
  useEffect(() => {
    isOpen && name_input.current?.focus();
    type === "edit" && initValue && setValue(initValue);
  }, [isOpen]);

  return (
    <DirectoryModalWrap
      id={id}
      className={className}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onClick={() => setIsPickerOpen(false)}
      isEmojiExist={value.emoji !== ""}
    >
      <h1 className="modal-title">
        디렉토리 {type === "new" ? "생성" : "수정"}
      </h1>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="input-emoji__label">디렉토리 아이콘</label>
      <div className="input-emoji">
        <Icon
          className="input-emoji__button"
          onClick={(e) => {
            e.stopPropagation();
            setIsPickerOpen(true);
          }}
        >
          {value.emoji !== "" ? (
            <>
              <span className="emoji-hover">
                <PlusIcon className="emoji-hover__icon" />
              </span>
              <span className="emoji">{value.emoji}</span>
            </>
          ) : (
            <PlusIcon className="plus-icon" />
          )}
        </Icon>
        {isPickerOpen && (
          <div className="picker-wrap" onClick={(e) => e.stopPropagation()}>
            <Picker
              pickerStyle={pickerStyle}
              onEmojiClick={(e, emojiObject) =>
                setValue({
                  ...value,
                  emoji: emojiObject.emoji,
                })
              }
            />
          </div>
        )}
      </div>
      <InputForm
        className="input-name"
        text="디렉토리 이름"
        length={value.name.length}
        maxLength={20}
        placeholder="디렉토리 이름을 입력해주세요"
        value={value.name}
        onChange={(e) => setValue({ ...value, name: e.target.value })}
        onKeyDown={handleKeyDown}
        onKeyPress={handleKeyPress}
        ref={name_input}
      />
      <div style={{ flexGrow: 1, width: "100%" }} />
      <div className="button-wrap">
        {type === "edit" && (
          <Btn
            id="delete"
            className="modal-button"
            isAtvBtn
            onClick={() => {
              delDir && delDir();
              setIsOpen(false);
            }}
          >
            삭제
          </Btn>
        )}
        <div style={{ flexGrow: 1 }} />
        <div className="button-inner">
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
            onClick={handleClickButton}
          >
            {type === "new" ? "생성" : "수정"}
          </Btn>
        </div>
      </div>
    </DirectoryModalWrap>
  );
};

export default DirectoryModal;

interface DirectoryModalWrapProps {
  isEmojiExist: boolean;
}
const DirectoryModalWrap = styled(Modal)<DirectoryModalWrapProps>`
  width: 516px;
  height: 367px;
  padding: 34px 32px;
  border-radius: 20px;

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
    font-weight: 500;
    font-size: 20px;
    line-height: 36px;
    color: var(--black_1);
  }
  .input-emoji__label {
    margin-bottom: 10px;
    font-size: 13px;
    line-height: 16px;
    color: var(--black_1);
  }
  .input-emoji {
    width: 100%;
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &__button {
      width: 48px;
      height: 48px;
      background: ${({ isEmojiExist }) =>
        isEmojiExist ? "none" : "var(--gray_2)"};
      opacity: 0.85;
      border-radius: 8px;
      @media (hover: hover) {
        &:hover {
          ${({ isEmojiExist }) =>
            isEmojiExist
              ? css`
                  .emoji-hover {
                    display: flex;
                  }
                `
              : css`
                  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.25);
                `}
        }
      }
      .emoji {
        font-size: 38px;
        text-align: center;
        line-height: 48px;
      }
      .emoji-hover {
        position: absolute;
        z-index: 2;
        width: 48px;
        height: 48px;
        border-radius: 6px;
        background: rgba(0, 0, 0, 0.65);
        display: none;
        align-items: center;
        justify-content: center;
        &__icon {
          width: 16px;
          height: 16px;
        }
      }
    }
  }
  .picker-wrap {
    position: absolute;
    margin-top: 60px;
    .emoji-picker-react .emoji-scroll-wrapper {
      ::-webkit-scrollbar {
        width: 10px;
      }
      /* Track */
      ::-webkit-scrollbar-track {
        background: none;
      }
      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: var(--gray_2);
        border-radius: 5px;
      }
      /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        background: var(--gray_3);
      }
    }
  }

  .input-name {
    #input {
      font-size: 15px;
    }
  }

  .button-wrap {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .button-inner {
      width: 150px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
    .modal-button {
      width: 70px;
      height: 46px;
      border-radius: 23px;
      font-size: 16px;
    }
    #cancel {
      margin-right: 10px;
    }
  }
`;
