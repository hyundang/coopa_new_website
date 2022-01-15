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
  setCurrDir: (dir: string) => void;
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
        allDir={allDir}
        fixedDir={fixedDir}
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
