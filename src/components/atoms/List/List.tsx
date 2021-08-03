import styled from "styled-components";
import defaultEmoji from "@assets/icons/card/cookiehover_icn_noicn.svg";
import { Dispatch, SetStateAction } from "react";

export interface Dirtype {
  emoji?: string;
  name: string;
}

export interface IProps {
  allDir: Dirtype[];
  setCurrDir: Dispatch<SetStateAction<string>>;
}
const List = ({ allDir, setCurrDir }: IProps) => {
  return (
    <ListWrap>
      {allDir?.map((dir) => (
        <div
          className="list-div"
          key={dir.name}
          onClick={(e) => {
            e.stopPropagation();
            setCurrDir(dir.name);
          }}
        >
          {dir.emoji ? (
            <p className="list-div__emoji">{dir.emoji}</p>
          ) : (
            <img className="list-div__emoji" alt="" src={defaultEmoji} />
          )}
          <p className="list-div__name">{dir.name}</p>
        </div>
      ))}
    </ListWrap>
  );
};
const ListWrap = styled.div`
  height: 18.4rem;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 0.8rem;
  }
  ::-webkit-scrollbar-track {
    background: none;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--gray_hover_1);
    border-radius: 0.5rem;
    box-sizing: border-box;
  }
  .list-div {
    display: flex;
    width: 100%;
    border-radius: 1.7rem;
    :hover {
      background: var(--gray_hover_2);
      /* 오른쪽 동그라미 */
      ::after {
        content: "";
        position: relative;
        display: block;
        margin: 1rem;
        margin-left: auto;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background: var(--orange);
      }
    }
    &__emoji {
      display: flex;
      align-items: center;
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

export default List;
