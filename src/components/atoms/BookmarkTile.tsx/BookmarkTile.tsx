import { Dispatch, SetStateAction, RefObject } from "react";
import styled from "styled-components";
// assets
import plus_icon from "@assets/icons/common/plus_white.svg";

export interface IProps {
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
  url,
  siteName,
  onClickTile,
  onClickDelBtn,
  setIsHover,
  isAddBtn,
  ref,
}: IProps) => {
  return (
    <Wrap
      onMouseOver={setIsHover ? () => setIsHover(true) : undefined}
      onMouseLeave={setIsHover ? () => setIsHover(false) : undefined}
      url={url}
      onClick={onClickTile}
      isAddBtn={isAddBtn}
      ref={ref}
      className="tile"
    >
      {isAddBtn ? (
        <img
          style={{ width: "2rem", height: "2rem" }}
          src={plus_icon}
          alt="plus_icon"
        />
      ) : (
        <div className="tile_content">
          <DelIcon onClick={onClickDelBtn}>×</DelIcon>
          <div className="tile_content__favicon" />
          <div className="tile_content__text">{siteName}</div>
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
  color: ${({ theme }) => theme.colors.gray_7};
  &:hover {
    background-color: #f7f0ed;
  }
`;

interface IWrap {
  url?: string;
  isAddBtn?: boolean;
}
const Wrap = styled.div<IWrap>`
  cursor: pointer;

  position: relative;
  z-index: 4;

  box-sizing: border-box;
  width: 8rem;
  height: 6.4rem;
  padding-top: 1.3rem;
  padding-bottom: 1.1rem;
  border-radius: 0.8rem;
  background-color: ${(props) =>
    props.isAddBtn ? "rgba(243,243,243,0.5)" : "rgba(255,255,255,0.85)"};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${(props) => (props.isAddBtn ? "center" : "space-between")};

  color: ${({ theme }) => theme.colors.gray_7};
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5rem;
  text-align: center;
  transition: 0.3s;

  &:hover {
    transition: 0.3s;
    margin-bottom: 1rem;
    background-color: ${(props) =>
      props.isAddBtn ? "rgba(243,243,243,0.7)" : "rgba(255, 255, 255, 0.95)"};
    box-shadow: 0 0.5rem 1.3rem rgba(0, 0, 0, 0.15);
    ${DelIcon} {
      display: block;
    }
  }

  .tile_content {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__favicon {
      width: 2.2rem;
      height: 2.2rem;
      border-radius: 0.4rem;
      margin-bottom: 0.6rem;
      background: url(${(props) => props.url}) center center / cover;
    }

    &__text {
      width: 6.2rem;
      height: 1.2rem;

      font-style: normal;
      font-weight: 500;
      font-size: 1rem;
      line-height: 1.2rem;
      color: ${({ theme }) => theme.colors.gray_7};

      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      overflow: hidden;
    }
  }
`;
