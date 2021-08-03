import CookieImg from "@components/molecules/CookieImg/CookieImg";
import CookieHover from "@components/molecules/CookieHover/CookieHover";
import styled from "styled-components";
import { SyntheticEvent, useState } from "react";
import fvcOnErrorImg from "@assets/icons/card/icn_favicon.svg";
import { CookieData } from "src/lib/interfaces/user";

export interface IProps {
  cookie: CookieData;
}

const Cookie = ({ cookie }: IProps) => {
  //normal: 기본 | hover: 호버 | parking: 파킹중 | input: 인풋입력중
  const [cardState, setCardState] = useState("normal");
  return (
    <CookieWrap
      onClick={() => window.open(cookie.link)}
      onMouseEnter={() => {
        if (cardState !== "input") setCardState("hover");
      }}
      onMouseLeave={() => {
        if (cardState !== "input") setCardState("normal");
      }}
    >
      <CookieImg cardState={cardState} content={cookie.content} />
      {(cardState === "hover" || cardState === "input") && (
        <div className="hover-div">
          <CookieHover allDir={[]} setCardState={setCardState} />
        </div>
      )}
      <div className="cookie--title">{cookie.title}</div>
      <div className="cookie--content">{cookie.content}</div>

      <div className="cookie--profile">
        <img
          className="cookie--profile__favicon"
          src={cookie.favicon}
          alt={fvcOnErrorImg}
          onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.src = fvcOnErrorImg;
          }}
        />
        <div className="cookie--profile__author">{cookie.provider}</div>
      </div>
    </CookieWrap>
  );
};

const CookieWrap = styled.section`
  position: relative;
  width: 100%;
  .hover-div {
    width: 100%;
    padding: 14px;
    position: absolute;
    top: 0;
  }
  .cookie--title {
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

  .cookie--content {
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

  .cookie--profile {
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
