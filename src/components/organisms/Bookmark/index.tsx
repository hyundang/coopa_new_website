import { BookmarkTile, Bubble } from "@components/atoms";
import { BookmarkDataProps } from "@interfaces/homeboard";
import { useState } from "react";
import styled, { css } from "styled-components";
import { BookmarkAddModal } from "..";
import { NewBookmarkProps } from "../BookmarkAddModal";

export interface BookmarkProps {
  /** id */
  id?: string;
  /** className */
  className?: string;
  /** bookmark data list */
  datas: BookmarkDataProps[];
  /** bookmark 추가 함수 */
  onClickSave: (newBookmark: NewBookmarkProps) => void;
  /** bookmark 삭제 함수 */
  onClickDel: (bookmarkID: number) => void;
}
const Bookmark = ({
  id,
  className,
  datas,
  onClickSave,
  onClickDel,
}: BookmarkProps) => {
  // add tile hover 여부
  const [isHover, setIsHover] = useState(false);
  // bookmark add modal open 여부
  const [isOpen, setIsOpen] = useState(false);
  // 추가할 bookmark data
  const [newBookmark, setNewBookmark] = useState<NewBookmarkProps>({
    name: "",
    link: "",
  });

  return (
    <>
      {datas?.length === 0 && (
        <StyledBubble isHover={isHover}>
          ⭐️자주 가는 사이트를 추가해보세요
        </StyledBubble>
      )}
      <BookmarkWrap id={id} className={className}>
        {datas?.map((bookmark: BookmarkDataProps) => (
          <BookmarkTile
            id={`${bookmark.id}`}
            className="bookmark-tile"
            key={bookmark.id}
            siteName={bookmark.name}
            url={bookmark.link}
            onClickDelBtn={(e: any) => {
              e.stopPropagation();
              onClickDel(Number(e.target.id));
            }}
          />
        ))}
        <BookmarkTile
          isAddBtn
          onClickAddBtn={() => setIsOpen(true)}
          setIsHover={setIsHover}
        />
        <BookmarkAddModal
          value={newBookmark}
          setValue={setNewBookmark}
          onClickSave={() => onClickSave(newBookmark)}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          locationX={-150 + 40}
        />
      </BookmarkWrap>
    </>
  );
};

export default Bookmark;

const StyledBubble = styled(Bubble)`
  position: absolute;
  z-index: 2;
  top: 13px;
  left: 50%;
  opacity: 0;

  transition: opacity 0.3s, transform 0.3s;
  ${({ isHover }) =>
    isHover
      ? css`
          transform: translate(-50%, -3px);
          opacity: 1;
        `
      : css`
          transform: translate(-50%, 0px);
          opacity: 0;
        `};

  &::after {
    top: 65%;
    border: solid transparent;
    border-top-color: var(--white);
    border-width: 20px;
    margin-left: -20px;
  }
`;

const BookmarkWrap = styled.div`
  width: auto;
  height: auto;

  display: flex;
  flex-direction: row;
  /* align-items: center; */

  .bookmark-tile {
    margin-right: 12px;
  }
`;
