import { Dispatch, SetStateAction, RefObject, forwardRef } from "react";
import styled from "styled-components";
// assets
import { PlusIcon } from "@assets/icons/common";
import { HomeboardIcon } from "@assets/icons/homeboard";
import bookmarkAnimation from "@components/animations/bookmark";

export interface BookmarkTileProps {
  /** id */
  id?: string;
  /** className */
  className?: string;
  /** 파비콘 url */
  url?: string;
  /** 사이트 이름 */
  siteName?: string;
  /** 즐겨찾기 타일 클릭 시 */
  onClickAddBtn?: React.MouseEventHandler<HTMLSpanElement>;
  /** 삭제 버튼(x) 클릭 시 */
  onClickDelBtn?: React.MouseEventHandler<HTMLSpanElement>;
  /** 즐겨찾기 타일 hover 판단 */
  setIsHover?: Dispatch<SetStateAction<boolean>>;
  /** 즐겨찾기 추가 타일의 경우 -> true */
  isAddBtn?: boolean;
}
const BookmarkTile = (
  {
    id,
    className = "tile",
    url,
    siteName,
    onClickAddBtn,
    onClickDelBtn,
    setIsHover,
    isAddBtn,
  }: BookmarkTileProps,
  ref?:
    | ((instance: HTMLDivElement | null) => void)
    | RefObject<HTMLDivElement>
    | null
    | undefined,
) => {
  return (
    <HoverWrap className={className} isAddBtn={isAddBtn}>
      <Wrap
        id={id}
        className="tile-wrap"
        role="button"
        onMouseOver={setIsHover ? () => setIsHover(true) : undefined}
        onMouseLeave={setIsHover ? () => setIsHover(false) : undefined}
        onClick={isAddBtn ? onClickAddBtn : () => window.open(url, "__blank")}
        isAddBtn={isAddBtn}
        ref={ref}
      >
        {isAddBtn ? (
          <PlusIcon className="plus-icon" />
        ) : (
          <div className="content">
            <DelIcon onClick={onClickDelBtn}>×</DelIcon>
            <img
              className="content__favicon"
              src={url}
              alt="favicon"
              onError={(e: SyntheticEvent<HTMLImageElement, Event>) =>
                (e.currentTarget.src = HomeboardIcon)
              }
            />
            <cite className="content__text">{siteName}</cite>
          </div>
        )}
      </Wrap>
    </HoverWrap>
  );
};

export default forwardRef(BookmarkTile);

const DelIcon = styled.button`
  all: unset;
  box-sizing: border-box;
  position: absolute;
  top: 5px;
  right: 5px;

  width: 15px;
  height: 15px;
  border-radius: 50%;

  display: none;

  font-size: 10px;
  font-weight: 500;
  text-align: center;
  line-height: 17px;
  color: var(--gray_7);
  &:hover {
    background-color: var(--gray_hover_1);
  }
`;

interface HoverWrapProps {
  isAddBtn?: boolean;
}
const HoverWrap = styled.div<HoverWrapProps>`
  position: relative;
  width: 80px;
  transition: 0.3s;
  &:hover {
    .tile-wrap {
      margin-top: 0;
      margin-bottom: 10px;
      box-shadow: 0 5px 13px rgba(0, 0, 0, 0.15);
      background-color: ${(props) =>
        props.isAddBtn ? "rgba(243,243,243,0.7)" : "rgba(255,255,255,0.95)"};
    }
    ${DelIcon} {
      display: block;
      animation: ${bookmarkAnimation.TileHoverRule};
    }
  }
`;

interface WrapProps {
  isAddBtn?: boolean;
}
const Wrap = styled.div<WrapProps>`
  cursor: pointer;
  box-sizing: border-box;
  width: 80px;
  height: 64px;
  margin-top: 10px;
  padding-top: 13px;
  padding-bottom: 11px;
  border-radius: 8px;
  background-color: ${(props) =>
    props.isAddBtn ? "rgba(243,243,243,0.5)" : "rgba(255,255,255,0.85)"};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${(props) => (props.isAddBtn ? "center" : "space-between")};

  color: var(--gray_7);
  font-weight: 500;
  font-size: 10px;
  line-height: 15px;
  text-align: center;
  transition: 0.3s;

  .plus-icon {
    width: 20px;
    height: 20px;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__favicon {
      width: 22px;
      height: 22px;
      border-radius: 4px;
      margin-bottom: 6px;
      object-fit: cover;
    }

    &__text {
      width: 62px;
      height: 12px;

      font-style: normal;
      font-weight: 500;
      font-size: 10px;
      line-height: 12px;
      color: var(--gray_7);

      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      overflow: hidden;
    }
  }
`;
