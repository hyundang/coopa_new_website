import { BookmarkTile, Bubble } from "@components/atoms";
import { BookmarkAddModal } from "@components/organisms";
import { BookmarkDataProps, CreateBookmarkProps } from "@interfaces/homeboard";
import React, { useEffect, useState, MouseEvent } from "react";
import styled, { css } from "styled-components";

export interface BookmarkProps {
  id?: string;
  className?: string;
  bookmarkData: BookmarkDataProps[];
  onClickCreateBtn?: (newBookmark: CreateBookmarkProps) => Promise<void>;
  onClickDelBtn?: (bookmarkID: number) => Promise<void>;
}
const Bookmark = ({
  id,
  className,
  bookmarkData,
  onClickCreateBtn,
  onClickDelBtn,
}: BookmarkProps) => {
  const [isHover, setIsHover] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [newBookmark, setNewBookmark] = useState<CreateBookmarkProps>({
    name: "",
    link: "",
  });

  const handleClickDelBtn = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClickDelBtn && onClickDelBtn(Number(e.currentTarget.id));
  };

  const handleClickCreateBtn = (link: string) =>
    onClickCreateBtn && onClickCreateBtn({ name: newBookmark.name, link });

  const handleKeyUp = (e: any) => {
    // ctrl + shift + f = 북마크 추가 모달
    if (e.key === "F" && e.shiftKey && e.ctrlKey) {
      setIsCreateModalOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <>
      {bookmarkData?.length === 0 && (
        <StyledBubble isHover={isHover}>
          ⭐️자주 가는 사이트를 추가해보세요
        </StyledBubble>
      )}
      <BookmarkWrap id={id} className={className}>
        {bookmarkData?.map((bookmark: BookmarkDataProps) => (
          <BookmarkTile
            id={`${bookmark.id}`}
            className="bookmark-tile"
            key={bookmark.id}
            siteName={bookmark.name}
            url={bookmark.link}
            imgUrl={bookmark.image}
            onClickDelBtn={handleClickDelBtn}
          />
        ))}
        {onClickCreateBtn && bookmarkData.length < 6 && (
          <>
            <BookmarkTile
              isPlusTile
              onClickPlusTile={() => setIsCreateModalOpen(true)}
              setIsHover={setIsHover}
            />
            <BookmarkAddModal
              value={newBookmark}
              setValue={setNewBookmark}
              onClickCreateBtn={handleClickCreateBtn}
              isOpen={isCreateModalOpen}
              setIsOpen={setIsCreateModalOpen}
              locationX={-150 + 40}
            />
          </>
        )}
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

  .bookmark-tile {
    margin-right: 12px;
  }
`;
