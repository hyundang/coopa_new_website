import { DefaultEmojiIcon } from "@assets/icons/card";
import { EmptyImg } from "@assets/imgs/error";
import { CreateDirProps } from "@interfaces/directory";
import React, {
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
  /** 검색 중인가 */
  isSearching: boolean;
  /** 현재 디렉토리 변경 */
  setCurrDir: (dir: string) => void;
  unpinnedDir: CreateDirProps[];
  pinnedDir: CreateDirProps[];
  searchedDir: CreateDirProps[];
  /** 하단 블러 설정 */
  setIsBlur?: Dispatch<SetStateAction<boolean>>;
}
const List = ({
  id,
  className,
  isSearching,
  unpinnedDir,
  pinnedDir,
  searchedDir,
  setCurrDir,
  setIsBlur,
}: ListProps) => {
  const viewport = useRef<HTMLUListElement>(null);
  const [target, setTarget] = useState<HTMLDivElement>();

  const returnLists = (dirList: CreateDirProps[]) => {
    return dirList?.map((dir) => (
      <ListItem
        className="list-item"
        key={dir.name}
        role="menuitem"
        onClick={(e) => {
          e.stopPropagation();
          setCurrDir(dir.name);
        }}
      >
        {dir.emoji ? (
          <span className="emoji">{dir.emoji}</span>
        ) : (
          <DefaultEmojiIcon className="emoji" />
        )}
        <span className="name">{dir.name}</span>
      </ListItem>
    ));
  };

  useEffect(() => {
    // for bottom shadow
    const option = {
      root: viewport.current,
      threshold: 1,
    };
    const handleIntersection = (entries: any) => {
      setIsBlur &&
        entries.forEach((entry: any) => {
          entry.isIntersecting ? setIsBlur(false) : setIsBlur(true);
        });
    };
    const io = new IntersectionObserver(handleIntersection, option);
    if (target) io.observe(target);
  }, [target]);

  return (
    <ListWrap id={id} className={className} ref={viewport} role="menu">
      {isSearching ? (
        <>
          <span>검색결과</span>
          {returnLists(searchedDir)}
        </>
      ) : pinnedDir.length === 0 && unpinnedDir.length === 0 ? (
        <EmptyWrap>
          <img className="empty_img" alt="empty_img" src={EmptyImg} />
          <p>저장된 디렉토리가 없어요!</p>
        </EmptyWrap>
      ) : (
        <>
          {pinnedDir.length !== 0 && <span>고정됨</span>}
          {returnLists(pinnedDir)}
          {unpinnedDir.length !== 0 && <span>기본</span>}
          {returnLists(unpinnedDir)}
        </>
      )}
      <div
        style={{ marginTop: "1px", height: "1px", marginBottom: "5px" }}
        ref={(e: HTMLDivElement) => setTarget(e)}
      />
    </ListWrap>
  );
};

export default List;

const ListWrap = styled.ul`
  display: flex;
  flex-direction: column;
  height: 184px;
  padding: 0;
  margin: 0;
  overflow: auto;
  & > span {
    font-weight: 500;
    font-size: 10px;
    line-height: 13px;
    color: var(--gray_5);
    margin: 5px;
  }
  @media screen and (min-width: 1600px) {
    height: 202px;
  }
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: none;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--gray_hover_1);
    border-radius: 5px;
    box-sizing: border-box;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--gray_3);
  }
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  width: 203px;
  border-radius: 17px;
  font-size: 14px;

  @media screen and (min-width: 1600px) {
    font-size: 15px;
    width: 235px;
    border-radius: 17px;
  }
  :hover {
    background: var(--gray_hover_2);
    /* 오른쪽 동그라미 */
    ::after {
      content: "";
      position: relative;
      display: block;
      margin: 10px;
      margin-left: auto;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--orange);
    }
  }
  .emoji {
    width: 16px;
    font-size: 16px;
    margin: 0 10px;
    object-fit: fill;
    @media screen and (min-width: 1600px) {
      font-size: 18px;
      width: 18px;
      margin: 0 13px;
    }
  }
  .name {
    max-width: 145px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-style: normal;
    font-weight: 500;
    margin: 7px 0;
    @media screen and (min-width: 1600px) {
      margin: 9px 0;
    }
  }
`;

const EmptyWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .empty_img {
    width: 120px;
    padding-top: 20px;
    margin-right: 20px;
  }
  p {
    padding: 0;
    margin-top: 12px;
    color: var(--gray_5);
    font-weight: 500;
    font-size: 12px;
  }
`;
