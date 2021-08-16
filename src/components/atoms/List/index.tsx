import styled from "styled-components";
import { DefaultEmojiIcon } from "@assets/icons/card";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export type Dirtype = {
  emoji?: string;
  name: string;
};
export interface ListProps {
  /** id */
  id?: string;
  /** className */
  className?: string;
  /** 현재 디렉토리 변경 setState */
  setCurrDir: Dispatch<SetStateAction<string>>;
  /** directory list data */
  allDir: Dirtype[];
  /** 하단 블러 처리 표시 여부 setState */
  setIsBlur?: Dispatch<SetStateAction<boolean>>;
}
const List = ({ id, className, allDir, setCurrDir, setIsBlur }: ListProps) => {
  const viewport = useRef<HTMLUListElement>(null);
  const [target, setTarget] = useState<HTMLDivElement>();

  useEffect(() => {
    // for bottom shadow
    const option = {
      root: viewport.current,
      threshold: 1,
    };
    const handleIntersection = (entries: any, observer: any) => {
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
      {allDir?.map((dir) => (
        <li
          className="list-item"
          key={dir.name}
          role="menuitem"
          onClick={(e) => {
            e.stopPropagation();
            setCurrDir(dir.name);
          }}
        >
          {dir.emoji ? (
            <span className="list-item__emoji">{dir.emoji}</span>
          ) : (
            <DefaultEmojiIcon className="list-item__emoji" />
          )}
          <span className="list-item__name">{dir.name}</span>
        </li>
      ))}
      <div
        style={{ marginTop: "1px", height: "1px" }}
        ref={(e: HTMLDivElement) => setTarget(e)}
      />
    </ListWrap>
  );
};

export default List;

const ListWrap = styled.ul`
  height: 184px;
  padding: 0;
  margin: 0;
  overflow: auto;
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
  .list-item {
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: 17px;
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
    &__emoji {
      margin: 0 8px;
      font-size: 14px;
    }
    &__name {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      margin: 7px 0;
    }
  }
`;
