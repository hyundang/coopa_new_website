import { Dispatch, SetStateAction, RefObject } from "react";
import styled from "styled-components";
// assets
import { PlusIcon } from "@assets/icons/common";

export interface BookmarkTileProps {
  /** id */
  id?: string;
  /** className */
  className?: string;
  /** 파비콘 url */
  url?: string;
  /** 사이트 이름 */
  siteName: string;
  /** 즐겨찾기 타일 클릭 시 */
  onClickTile: React.MouseEventHandler<HTMLDivElement>;
  /** 삭제 버튼(x) 클릭 시 */
  onClickDelBtn?: React.MouseEventHandler<HTMLDivElement>;
  /** 즐겨찾기 타일 hover 판단 */
  setIsHover?: Dispatch<SetStateAction<boolean>>;
  /** 즐겨찾기 추가 타일의 경우 -> true */
  isAddBtn?: boolean;
  /** ref */
  ref?:
    | ((instance: HTMLDivElement | null) => void)
    | RefObject<HTMLDivElement>
    | null
    | undefined;
}
const BookmarkTile = ({
  id,
  className = "tile",
  url,
  siteName,
  onClickTile,
  onClickDelBtn,
  setIsHover,
  isAddBtn,
  ref,
}: BookmarkTileProps) => {
  return (
    <Wrap
      id={id}
      className={className}
      onMouseOver={setIsHover ? () => setIsHover(true) : undefined}
      onMouseLeave={setIsHover ? () => setIsHover(false) : undefined}
      url={url}
      onClick={onClickTile}
      isAddBtn={isAddBtn}
      ref={ref}
    >
      {isAddBtn ? (
        <PlusIcon style={{ width: "2rem", height: "2rem" }} />
      ) : (
        <div className="content">
          <DelIcon onClick={onClickDelBtn}>×</DelIcon>
          <div className="content__favicon" />
          <div className="content__text">{siteName}</div>
        </div>
      )}
    </Wrap>
  );
};

export default BookmarkTile;

const DelIcon = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;

  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;

  display: none;

  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  line-height: 1.7rem;
  color: var(--gray_7);
  &:hover {
    background-color: #f7f0ed;
  }
`;

interface WrapProps {
  url?: string;
  isAddBtn?: boolean;
}
const Wrap = styled.div<WrapProps>`
  cursor: pointer;

  position: relative;
  z-index: 4;

  box-sizing: border-box;
  width: 80px;
  height: 64px;
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

  &:hover {
    transition: 0.3s;
    margin-bottom: 10px;
    background-color: ${(props) =>
      props.isAddBtn ? "rgba(243,243,243,0.7)" : "rgba(255, 255, 255, 0.95)"};
    box-shadow: 0 5px 13px rgba(0, 0, 0, 0.15);
    ${DelIcon} {
      display: block;
    }
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
      background: url(${(props) => props.url}) center center / cover;
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
