import { Btn, Input, List } from "@components/atoms";
import { DirDataProps } from "@interfaces/directory";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useRef,
} from "react";
import styled from "styled-components";

export interface ListContentProps {
  className?: string;
  unpinnedDir: DirDataProps[];
  pinnedDir: DirDataProps[];
  setCardState: Dispatch<
    SetStateAction<"hover" | "normal" | "parking" | "input">
  >;
  setCurrDir: Dispatch<SetStateAction<string>>;
}
const ListContent = ({
  className,
  unpinnedDir,
  pinnedDir,
  setCardState,
  setCurrDir,
}: ListContentProps) => {
  const [inputText, setInputText] = useState("");
  const [searchedDir, setSearchedDir] = useState<DirDataProps[]>([]);
  const [isBlur, setIsBlur] = useState(true);
  const [isExist, setIsExist] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const findDirInDirListAndSetSearchedDirList = () => {
    unpinnedDir.find((dir) => dir.name === inputText) ||
    pinnedDir.find((dir) => dir.name === inputText)
      ? setIsExist(true)
      : setIsExist(false);
    setSearchedDir(
      inputText === ""
        ? []
        : pinnedDir
            .filter((dir) =>
              dir.name.toLowerCase().includes(inputText.toLowerCase()),
            )
            .concat(
              unpinnedDir.filter((dir) =>
                dir.name.toLowerCase().includes(inputText.toLowerCase()),
              ),
            ),
    );
  };

  useEffect(() => {
    findDirInDirListAndSetSearchedDirList();
  }, [inputText]);

  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;
      const isClickOutside =
        el && !el.contains((event?.target as Node) || null);
      if (isClickOutside) {
        setCardState("normal");
      }
    };
    setTimeout(() => document.addEventListener("click", listener), 100);
    return () => {
      document.removeEventListener("click", listener);
    };
  }, []);

  return (
    <Wrap className={className} isBlur={isBlur} ref={ref}>
      <List
        className="directory-list"
        isSearching={!!inputText}
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
            value={inputText}
            onFocus={() => setCardState("input")}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputText(e.target.value)
            }
            onKeyPress={(e) => (e.key === "Enter" ? setCurrDir(inputText) : {})}
          />
        </InputWrapper>
        <Btn
          className="directory-form__button"
          onClick={() => setCurrDir(inputText)}
          isOrange
          isCookieDirBtn
          isAtvBtn={!!inputText.length && !isExist}
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

const CookieInput = styled(Input)`
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
`;

const InputWrapper = styled.div`
  position: relative;
`;
