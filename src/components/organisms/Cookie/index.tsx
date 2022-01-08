import { CookieHover, CookieImg } from "@components/molecules";
import styled, { css } from "styled-components";
import { useState, useEffect, forwardRef, RefObject } from "react";
import { fvcOnErrorImg } from "@assets/icons/card";
import { CookieDataProps } from "src/lib/interfaces/cookie";
import {
  DirectoryDataProps,
  PostCookieToDirProps,
  PostDirectoryProps,
} from "src/lib/interfaces/directory";
import CookieModule from "@modules/CookieModule";
import DirDetailModule from "@modules/DirDetailModule";

export interface CookieProps {
  /** id */
  id?: string;
  /** className */
  className?: string;
  /** cookie type */
  type: "normal" | "searched" | "dirDetail" | "dirShare";
  /** cookie */
  cookie?: CookieDataProps;
  /** cookie data loading */
  isLoading: boolean;
  /** 쿠키 모듈 */
  // cookieModule: ReturnType<typeof CookieModule | typeof DirDetailModule>;
  cookieModule: ReturnType<typeof CookieModule>;
  /** all directory */
  allDir?: DirectoryDataProps[];
  /** 고정 디렉토리 */
  fixedDir?: DirectoryDataProps[];
  /** post dir */
  postDir?: (data: PostDirectoryProps) => void;
}
const Cookie = (
  {
    id,
    className,
    type,
    cookie,
    isLoading,
    cookieModule,
    allDir,
    fixedDir,
    postDir,
  }: CookieProps,
  ref?:
    | ((instance: HTMLButtonElement | null) => void)
    | RefObject<HTMLButtonElement>
    | null
    | undefined,
) => {
  //normal: 기본 | hover: 호버 | parking: 파킹중 | input: 인풋입력중
  const [cardState, setCardState] = useState<
    "hover" | "normal" | "parking" | "input"
  >("normal");

  //현재 디렉토리
  const [currDir, setCurrDir] = useState(
    cookie?.directoryInfo?.name === undefined
      ? "모든 쿠키"
      : cookie?.directoryInfo.name,
  );
  useEffect(() => {
    (async () => {
      if (currDir !== cookie?.directoryInfo?.name && currDir !== "모든 쿠키") {
        if (allDir?.filter((dir) => dir.name === currDir).length === 0) {
          postDir && (await postDir({ name: currDir }));
        }
        if (currDir !== cookie?.directoryInfo?.name) {
          const body: PostCookieToDirProps = {
            cookieId: cookie?.id || -1,
            directoryId:
              allDir?.filter((dir) => dir.name === currDir)[0]?.id || 0,
          };
          body.directoryId &&
            cookieModule.changeDirOfCookie(
              body,
              cookie?.isPinned || false,
              type === "searched",
            );
          setCardState("parking");
          setTimeout(() => setCardState("normal"), 1500);
        }
      }
    })();
  }, [currDir, allDir]);
  return (
    <CookieWrap
      id={id}
      className={className}
      onClick={() => {
        window.open(cookie?.link);
        cookieModule.editCookieReadCount(
          cookie?.id || -1,
          cookie?.isPinned || false,
          type === "searched",
        );
      }}
      onMouseEnter={() => {
        if (cardState === "normal" && !isLoading) setCardState("hover");
      }}
      onMouseLeave={() => {
        if (cardState === "hover" && !isLoading) setCardState("normal");
      }}
      isLoading={isLoading}
      ref={ref}
    >
      <CookieImg
        cardState={type === "dirShare" ? "normal" : cardState}
        setCardState={setCardState}
        cookie={cookie}
        copyCookieLink={cookieModule.copyCookieLink}
        deleteCookieHanlder={
          cookie?.isPinned
            ? (cookieId) =>
                cookieModule.deleteCookie(cookieId, true, type === "searched")
            : (cookieId) =>
                cookieModule.deleteCookie(cookieId, false, type === "searched")
        }
        handleEditCookie={
          cookie?.isPinned
            ? (cookieId) =>
                cookieModule.editCookie(cookieId, true, type === "searched")
            : (cookieId) =>
                cookieModule.editCookie(cookieId, false, type === "searched")
        }
        isEditLoading={cookieModule.isEditCookieLoading}
        handlePinCookie={(cookieId, isPinned) =>
          cookieModule.editCookieIsPinned(
            cookieId,
            isPinned,
            type === "searched",
          )
        }
      />
      {type !== "dirShare" && (cardState === "hover" || cardState === "input") && (
        <div className="hover-div">
          <CookieHover
            allDir={allDir || []}
            fixedDir={fixedDir || []}
            setCardState={setCardState}
            currDir={
              cookie?.directoryInfo?.emoji !== null
                ? `${cookie?.directoryInfo?.emoji} ${currDir}`
                : currDir
            }
            setCurrDir={setCurrDir}
          />
        </div>
      )}
      <section className="cookie--desc">
        <h1 className="cookie--title">{cookie?.title}</h1>
        <div className="cookie--content">{cookie?.content}</div>
        <div style={{ flexGrow: 1 }} />
        <div className="cookie--profile">
          <img
            className="cookie--profile__favicon"
            src={cookie?.favicon}
            alt={fvcOnErrorImg}
            onError={(e) => {
              e.currentTarget.src = fvcOnErrorImg;
            }}
          />
          <div className="cookie--profile__favicon--loading" />
          <cite className="cookie--profile__author">{cookie?.provider}</cite>
        </div>
      </section>
    </CookieWrap>
  );
};

interface CookieWrapProps {
  isLoading: boolean;
}
const CookieWrap = styled.article<CookieWrapProps>`
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
      ${({ isLoading }) =>
        isLoading
          ? css`
              width: 100%;
              height: 20px;
              background-color: var(--gray_3);
              border-radius: 4px;
            `
          : css`
              all: unset;
            `}

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
      ${({ isLoading }) =>
        isLoading
          ? css`
              width: 100%;
              height: 20px;
              background-color: var(--gray_2);
              border-radius: 4px;
            `
          : css`
              all: unset;
            `}
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
      line-height: normal;
      display: flex;
      align-items: center;
      &__author {
        ${({ isLoading }) =>
          isLoading
            ? css`
                width: 57px;
                height: 12px;
                background-color: var(--gray_3);
                border-radius: 4px;
              `
            : css`
                all: unset;
              `}
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
        ${({ isLoading }) =>
          isLoading &&
          css`
            display: none;
          `}
        margin-right: 8px;
        width: 22px;
        height: 22px;
        border-radius: 4px;
        object-fit: cover;
      }
      &__favicon--loading {
        ${({ isLoading }) =>
          isLoading
            ? css`
                display: block;
                margin-right: 8px;
                width: 22px;
                height: 22px;
                border-radius: 4px;
                background-color: var(--gray_3);
              `
            : css`
                display: none;
              `}
      }
    }
  }
`;

export default forwardRef(Cookie);
