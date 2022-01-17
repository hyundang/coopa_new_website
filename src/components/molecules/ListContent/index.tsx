import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { Btn, Input, List } from "@components/atoms";
import { DirDataProps } from "@interfaces/directory";

export interface ListContentProps {
  className?: string;
  /** 모든 디렉토리 data */
  unpinnedDir: DirDataProps[];
  /** 고정 디렉토리 */
  pinnedDir: DirDataProps[];
  /** cardState를 parking으로 변경 */
  setCardState: Dispatch<
    SetStateAction<"hover" | "normal" | "parking" | "input">
  >;
  // set currDir
  setCurrDir: (dir: string) => void;
}
const ListContent = ({
  className,
  unpinnedDir,
  pinnedDir,
  setCardState,
  setCurrDir,
}: ListContentProps) => {
  // 디렉토리명 입력 input
  const [text, setText] = useState("");
  const [searchedDir, setSearchedDir] = useState<DirDataProps[]>([]);
  // 리스트 하단 블러 표시 여부
  const [isBlur, setIsBlur] = useState(true);
  const [isError, setIsError] = useState(false);

  const postHandler = () => {
    setCurrDir(text);
  };

  //디렉토리 검색
  useEffect(() => {
    unpinnedDir.find((dir) => dir.name === text)
      ? setIsError(true)
      : setIsError(false);
    setSearchedDir(
      text === ""
        ? []
        : pinnedDir
            .filter((dir) =>
              dir.name.toLowerCase().includes(text.toLowerCase()),
            )
            .concat(
              unpinnedDir.filter((dir) =>
                dir.name.toLowerCase().includes(text.toLowerCase()),
              ),
            ),
    );
  }, [text]);

  return (
    <Wrap className={className} isBlur={isBlur}>
      <List
        className="directory-list"
        isSearched={!!text}
        unpinnedDir={unpinnedDir}
        searchedDir={searchedDir}
        pinnedDir={pinnedDir}
        setIsBlur={setIsBlur}
        setCurrDir={setCurrDir}
      />
      <div className="directory-form" onClick={(e) => e.stopPropagation()}>
        <InputWrapper>
          <CookieInput
            className="directory-form__input"
            placeholder="검색 혹은 새 디랙토리 생성"
            maxLength={13}
            value={text}
            isError={isError}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setText(e.target.value);
              setCardState("input");
            }}
            onKeyPress={(e) => (e.key === "Enter" ? postHandler() : {})}
            onBlur={(e) =>
              e.target.className !== "form" && setCardState("normal")
            }
          />
          {isError && (
            <div className="alert">동일한 이름의 디렉토리가 있습니다</div>
          )}
        </InputWrapper>
        <Btn
          className="directory-form__button"
          onClick={() => postHandler()}
          isOrange
          isCookieDirBtn
          isAtvBtn={!!text.length}
        >
          만들기
        </Btn>
      </div>
    </Wrap>
  );
};

export default ListContent;

interface ListContentWrapProps {
  isBlur?: boolean;
}

const Wrap = styled.div<ListContentWrapProps>`
  .directory-form {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 12px;
    box-shadow: ${(props) =>
      props.isBlur ? "0px -20px 10px 0px rgba(255,255,255,1)" : "none"};

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
`;

type CookieInputProps = {
  isError?: boolean;
};

const CookieInput = styled(Input)<CookieInputProps>`
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
    font-size: 12px;
    line-height: 11px;
  `};
  ${({ isError }) =>
    isError &&
    `
        border-color:#FF2E00;
        box-shadow: 0px 0px 5px rgba(255, 0, 0, 0.35);
    `};
`;

const InputWrapper = styled.div`
  position: relative;
  & > .alert {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -4.2rem;
    width: 100%;
    padding: 1rem 0;
    border-radius: 1rem;
    color: #ff2e00;
    background-color: var(--orange_sub);
    box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.12);
  }
`;
