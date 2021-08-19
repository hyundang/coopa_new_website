import { CookieHover, CookieImg } from "@components/molecules";
import styled from "styled-components";
import { SyntheticEvent, useState, useEffect } from "react";
import { fvcOnErrorImg } from "@assets/icons/card";
import { CookieDataProps } from "src/lib/interfaces/cookie";
import { DirectoryDataProps } from "src/lib/interfaces/directory";

export interface CookieProps {
  /** id */
  id?: string;
  /** className */
  className?: string;
  /** cookie */
  cookie: CookieDataProps;
  /** all directory */
  allDir: DirectoryDataProps[];
  /** share cookie */
  isShared?: boolean;
}
const Cookie = ({ id, className, cookie, allDir, isShared }: CookieProps) => {
  //normal: 기본 | hover: 호버 | parking: 파킹중 | input: 인풋입력중
  const [cardState, setCardState] = useState<
    "hover" | "normal" | "parking" | "input"
  >("normal");

  //현재 디렉토리
  const [currDir, setCurrDir] = useState(
    cookie.directoryInfo?.name === undefined
      ? "모든 쿠키"
      : cookie.directoryInfo.name,
  );
  useEffect(() => {
    setCardState("parking");
    setTimeout(() => setCardState("normal"), 1500);
  }, [currDir]);
  return (
    <CookieWrap
      id={id}
      className={className}
      onClick={() => window.open(cookie.link)}
      onMouseEnter={() => {
        if (cardState !== "input") setCardState("hover");
      }}
      onMouseLeave={() => {
        if (cardState !== "input") setCardState("normal");
      }}
    >
      <CookieImg cardState={isShared ? "normal" : cardState} cookie={cookie} />
      {!isShared && (cardState === "hover" || cardState === "input") && (
        <div className="hover-div">
          <CookieHover
            allDir={allDir || []}
            setCardState={setCardState}
            currDir={currDir}
            setCurrDir={setCurrDir}
          />
        </div>
      )}
      <div className="cookie--desc">
        <div className="cookie--title">{cookie.title}</div>
        <div className="cookie--content">{cookie.content}</div>
        <div style={{ flexGrow: 1 }} />
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
      </div>
    </CookieWrap>
  );
};

const CookieWrap = styled.article`
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  :hover {
    .cookie--title {
      text-decoration: underline;
    }
  }
  .hover-div {
    position: absolute;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .cookie--desc {
    padding: 12px 10px 46px 10px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    .cookie--title {
      color: var(--black_1);
      line-height: 26px;
      font-size: 17px;
      font-weight: 500;
      margin-bottom: 7px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      word-wrap: normal;
      word-break: break-all;
    }

    .cookie--content {
      font-weight: 400;
      line-height: 22px;
      font-size: 14px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      word-wrap: normal;
      word-break: break-all;
      color: var(--gray_5);
    }

    .cookie--profile {
      /* margin-top: auto; */
      line-height: normal;
      display: flex;
      align-items: center;
      &__author {
        font-size: 13px;
        color: var(--gray_5);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        word-wrap: normal;
        word-break: break-all;
      }
      &__favicon {
        margin-right: 8px;
        width: 22px;
        height: 22px;
        border-radius: 4px;
        object-fit: cover;
      }
    }
  }
`;

export default Cookie;
