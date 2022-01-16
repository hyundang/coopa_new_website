import { useState, SetStateAction, Dispatch } from "react";
import styled from "styled-components";
import { DropDown } from "@components/atoms";
import { DirectoryDataProps } from "@interfaces/directory";
import { ListContent } from "..";

export interface CookieHoverProps {
  /** id */
  id?: string;
  /** className */
  className?: string;
  /** 모든 디렉토리 data */
  unpinnedDir: DirectoryDataProps[];
  /** 고정 디렉토리 */
  pinnedDir: DirectoryDataProps[];
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
  unpinnedDir,
  pinnedDir,
  setCardState,
  currDir,
  setCurrDir,
}: CookieHoverProps) => {
  // 버튼 활성화 여부
  const [isActive, setIsActive] = useState(false);

  return (
    <CookieHoverWrap
      id={id}
      className={className}
      selectedItem={currDir}
      isActive={isActive}
      setIsActive={setIsActive}
    >
      <ListContent
        className="list-content"
        unpinnedDir={unpinnedDir}
        pinnedDir={pinnedDir}
        setCardState={setCardState}
        setCurrDir={setCurrDir}
      />
    </CookieHoverWrap>
  );
};

export default CookieHover;

const CookieHoverWrap = styled(DropDown)`
  width: 300px;
  padding: 14px;
  ${({ theme }) => theme.media.desktop_3`
    width: 270px;
  `}
`;
