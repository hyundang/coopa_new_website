import { CookieHover, CookieImg } from "@components/molecules";
import styled from "styled-components";
import { SyntheticEvent, useState } from "react";
import fvcOnErrorImg from "@assets/icons/card/icn_favicon.svg";

export interface CookieProps {
  /** id */
  id?: string;
  /** className */
  className?: string;
}
const Cookie = ({ id, className }: CookieProps) => {
  //normal: 기본 | hover: 호버 | parking: 파킹중 | input: 인풋입력중
  const [cardState, setCardState] = useState<
    "hover" | "normal" | "parking" | "input"
  >("normal");
  return (
    <CookieWrap
      id={id}
      className={className}
      onMouseEnter={() => {
        if (cardState !== "input") setCardState("hover");
      }}
      onMouseLeave={() => {
        if (cardState !== "input") setCardState("normal");
      }}
    >
      <CookieImg cardState={cardState} />
      {(cardState === "hover" || cardState === "input") && (
        <div className="hover-div">
          <CookieHover allDir={[]} setCardState={setCardState} />
        </div>
      )}
      <div className="title">
        타이틀이 한 줄이고 텍스트가 없는 경우에는 어떻게 될까 타이틀이 한
        카드카드카드카드 카드
      </div>
      <div className="content">
        5년 전, 트위터가 동영상에 미래를 맡겼었다는 사실은 꽤 놀라운 사실일
        거다. 오늘날 트위터는 주로...
      </div>

      <div className="profile">
        <img
          className="profile__favicon"
          src="https://www.youtube.com/s/desktop/0c58a82c/img/favicon_32x32.png"
          alt={fvcOnErrorImg}
          onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.src = fvcOnErrorImg;
          }}
        />
        <div className="profile__author">작성자 이름</div>
      </div>
    </CookieWrap>
  );
};

const CookieWrap = styled.section`
  position: relative;
  width: 100%;
  .hover-div {
    position: absolute;
    top: 0;
  }
  .title {
    color: var(--black_1);
    line-height: 2.6rem;
    font-size: 1.7rem;
    font-weight: 500;
    margin-top: 1.2rem;
    margin-left: 1rem;
    margin-right: 1rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    word-wrap: normal;
    word-break: break-all;
  }

  .content {
    font-weight: 400;
    line-height: 2.2rem;
    font-size: 1.4rem;
    margin-top: 0.7rem;
    margin-left: 1rem;
    margin-right: 1rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    word-wrap: normal;
    word-break: break-all;
    color: var(--gray_5);
  }

  .profile {
    margin-top: auto;
    line-height: normal;
    display: flex;
    align-items: center;
    margin-bottom: 4.6rem;
    margin-left: 1rem;
    &__author {
      margin-left: 1rem;
      font-size: 1.3rem;
      color: var(--gray_5);
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      word-wrap: normal;
      word-break: break-all;
    }
    &__favicon {
      width: 2.2rem;
      height: 2.2rem;
      border-radius: 0.4rem;
      object-fit: cover;
    }
  }
`;

export default Cookie;
