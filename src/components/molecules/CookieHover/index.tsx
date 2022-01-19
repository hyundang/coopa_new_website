import { DropDown } from "@components/atoms";
import { ListContent } from "@components/molecules";
import { DirDataProps } from "@interfaces/directory";
import React, { useState, SetStateAction, Dispatch } from "react";
import styled from "styled-components";

export interface CookieHoverProps {
  id?: string;
  className?: string;
  unpinnedDir: DirDataProps[];
  pinnedDir: DirDataProps[];
  setCardState: Dispatch<
    SetStateAction<"hover" | "normal" | "parking" | "input">
  >;
  currDir: string;
  setCurrDir: Dispatch<SetStateAction<string>>;
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
  const [isBtnActive, setIsBtnActive] = useState(false);

  return (
    <CookieHoverWrap
      id={id}
      className={className}
      selectedDir={currDir}
      isActive={isBtnActive}
      setIsActive={setIsBtnActive}
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
