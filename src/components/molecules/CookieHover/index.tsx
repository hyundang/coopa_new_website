import {
  useState,
  ChangeEvent,
  SetStateAction,
  Dispatch,
  useEffect,
  KeyboardEventHandler,
} from "react";
import styled from "styled-components";
import { Btn, Input, List, DropDown } from "@components/atoms";
import { DirectoryDataProps } from "@interfaces/directory";
import { directoryInfoType } from "@interfaces/cookie";

export interface CookieHoverProps {
  /** id */
  id?: string;
  /** className */
  className?: string;
  /** 모든 디렉토리 data */
  allDir: DirectoryDataProps[];
  /** 고정 디렉토리 */
  fixedDir: DirectoryDataProps[];
  /** cardState를 parking으로 변경 */
  setCardState: Dispatch<
    SetStateAction<"hover" | "normal" | "parking" | "input">
  >;
  //현재 디렉토리
  currDir: string;
  //set currDir
  setCurrDir: Dispatch<SetStateAction<string>>;
  // postHandler:
}

const CookieHover = ({
  id,
  className,
  allDir,
  fixedDir,
  setCardState,
  currDir,
  setCurrDir,
}: CookieHoverProps) => {
  // 버튼 활성화 여부
  const [isActive, setIsActive] = useState(false);
  // 디렉토리명 입력 input
  const [text, setText] = useState("");
  const [searchedDir, setSearchedDir] = useState<DirectoryDataProps[]>([]);
  // 리스트 하단 블러 표시 여부
  const [isBlur, setIsBlur] = useState(true);
  //디렉토리 검색
  useEffect(() => {
    setSearchedDir(
      text === ""
        ? []
        : fixedDir
            .filter((dir) =>
              dir.name.toLowerCase().includes(text.toLowerCase()),
            )
            .concat(
              allDir.filter((dir) =>
                dir.name.toLowerCase().includes(text.toLowerCase()),
              ),
            ),
    );
  }, [text]);

  return (
    <CookieHoverWrap
      id={id}
      className={className}
      selectedItem={currDir}
      isActive={isActive}
      setIsActive={setIsActive}
      isBlur={isBlur}
    >
      <div className="list-content">
        <List
          className="directory-list"
          isSearched={!!text}
          allDir={allDir}
          searchedDir={searchedDir}
          fixedDir={fixedDir}
          setIsBlur={setIsBlur}
          setCurrDir={setCurrDir}
        />
        <div className="directory-form" onClick={(e) => e.stopPropagation()}>
          <Input
            className="directory-form__input"
            placeholder="새 디렉토리 명을 입력하세요"
            maxLength={13}
            value={text}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setText(e.target.value);
              setCardState("input");
            }}
            onBlur={(e) =>
              e.target.className !== "form" && setCardState("normal")
            }
          />
          <Btn
            className="directory-form__button"
            // onClick={() => postHandler()}
            isOrange
            isCookieDirBtn
            isAtvBtn={!!text.length}
          >
            만들기
          </Btn>
        </div>
      </div>
    </CookieHoverWrap>
  );
};

export default CookieHover;

interface CookieHoverWrapProps {
  isBlur?: boolean;
}
const CookieHoverWrap = styled(DropDown)<CookieHoverWrapProps>`
  width: 300px;
  padding: 14px;
  ${({ theme }) => theme.media.desktop_3`
    width: 270px;
  `}

  .list-content {
    .directory-form {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-top: 12px;
      box-shadow: ${(props) =>
        props.isBlur ? "-60px 0 30px 30px rgba(255,255,255,1)" : "none"};

      &__input {
        width: 170px;
        height: 40px;
        border-radius: 8px;
        font-weight: 500;
        font-size: 13px;
        line-height: 13px;
        padding: 0px 8px;

        ${({ theme }) => theme.media.desktop_3`
          width: 155px;
          height: 36px;
          font-size: 11px;
          line-height: 11px;
        `}
      }

      &__button {
        width: 66px;
        height: 40px;
        border-radius: 20px;
        font-size: 15px;
        line-height: 15px;

        ${({ theme }) => theme.media.desktop_3`
          width: 58px;
          height: 36px;
          border-radius: 17.5px;
          font-size: 13px;
          line-height: 13px;
        `}
      }
    }
  }
`;
