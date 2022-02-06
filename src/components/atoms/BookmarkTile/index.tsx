// assets
import { PlusIcon } from "@assets/icons/common";
import { Img } from "@components/atoms";
import bookmarkAnimation from "@components/animations/bookmark";
import React, { Dispatch, SetStateAction, RefObject, forwardRef } from "react";
import styled from "styled-components";

export interface BookmarkTileProps {
  id?: string;
  className?: string;
  /** 사이트 url */
  url?: string;
  /** 파비콘 url */
  imgUrl?: string;
  siteName?: string;
  onClickPlusTile?: React.MouseEventHandler<HTMLSpanElement>;
  onClickDelBtn?: React.MouseEventHandler<HTMLSpanElement>;
  setIsHover?: Dispatch<SetStateAction<boolean>>;
  /** 즐겨찾기 추가 타일의 경우 -> true */
  isPlusTile?: boolean;
}
const BookmarkTile = (
  {
    id,
    className = "tile",
    url,
    imgUrl,
    siteName,
    onClickPlusTile,
    onClickDelBtn,
    setIsHover,
    isPlusTile,
  }: BookmarkTileProps,
  ref?:
    | ((instance: HTMLDivElement | null) => void)
    | RefObject<HTMLDivElement>
    | null
    | undefined,
) => {
  return (
    <HoverWrap className={className} isPlusTile={isPlusTile}>
      <Wrap
        id={id}
        className="tile-wrap"
        role="button"
        onMouseOver={setIsHover ? () => setIsHover(true) : undefined}
        onMouseLeave={setIsHover ? () => setIsHover(false) : undefined}
        onClick={
          isPlusTile ? onClickPlusTile : () => window.open(url, "__blank")
        }
        isPlusTile={isPlusTile}
        ref={ref}
      >
        {isPlusTile ? (
          <PlusIcon className="plus-icon" />
        ) : (
          <TileContent>
            {onClickDelBtn && (
              <DelIcon id={id} onClick={onClickDelBtn}>
                ×
              </DelIcon>
            )}
            <Img
              className="favicon"
              src={imgUrl}
              alt="favicon"
              type="bookmark"
            />
            <cite className="text">{siteName}</cite>
          </TileContent>
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
  isPlusTile?: boolean;
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
        props.isPlusTile ? "rgba(243,243,243,0.7)" : "rgba(255,255,255,0.95)"};
    }
    ${DelIcon} {
      display: block;
      animation: ${bookmarkAnimation.TileHoverRule};
    }
  }
`;

interface WrapProps {
  isPlusTile?: boolean;
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
    props.isPlusTile ? "rgba(243,243,243,0.5)" : "rgba(255,255,255,0.85)"};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${(props) =>
    props.isPlusTile ? "center" : "space-between"};

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
`;

const TileContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .favicon {
    width: 22px;
    height: 22px;
    border-radius: 4px;
    margin-bottom: 6px;
    object-fit: cover;
  }

  .text {
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
`;
