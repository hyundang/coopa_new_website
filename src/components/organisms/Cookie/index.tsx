// assets
import { PinImg } from "@assets/imgs/card";
// components
import { CookieHover, CookieImg } from "@components/molecules";
import { CookieEditModal, DelModal } from "..";
import { Img } from "@components/atoms";
// interfaces
import { CookieDataProps, UpdateCookieProps } from "@interfaces/cookie";
import {
  DirDataProps,
  CreateCookieToDirProps,
  CreateDirProps,
} from "@interfaces/directory";
// libs
import styled from "styled-components";
import React, { useState, useEffect, forwardRef, RefObject } from "react";
// modules
import CookieModule from "@modules/CookieModule";

export interface CookieProps {
  id?: string;
  className?: string;
  type: "normal" | "searched" | "dirDetail" | "dirShare";
  cookieData: CookieDataProps;
  /** cookie data loading */
  isLoading: boolean;
  cookieModule: ReturnType<typeof CookieModule>;
  unpinnedDir?: DirDataProps[];
  pinnedDir?: DirDataProps[];
  createDir?: (data: CreateDirProps) => Promise<number>;
  refreshDir?: () => Promise<void>;
}
const Cookie = (
  {
    id,
    className,
    type,
    cookieData,
    isLoading,
    cookieModule,
    unpinnedDir = [],
    pinnedDir = [],
    createDir = async () => -1,
    refreshDir = async () => {},
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

  // cookie 고정 여부
  const [isCookiePinned, setIsCookiePinned] = useState(
    cookieData?.isPinned || false,
  );

  const [updatedCookieData, setUpdatedCookieData] = useState<UpdateCookieProps>(
    {
      title: cookieData?.title || "",
      content: cookieData?.content || "",
      thumbnail: cookieData?.thumbnail || "",
      cookieId: cookieData?.id || -1,
    },
  );
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  //현재 디렉토리
  const [currDir, setCurrDir] = useState(
    cookieData.directoryInfo?.name || "모든 쿠키",
  );

  const [updatedDir, setUpdatedDir] = useState({
    name: cookieData.directoryInfo?.name || "",
    emoji: cookieData.directoryInfo?.emoji || "",
  });

  const initializeModal = () =>
    isUpdateModalOpen &&
    setUpdatedCookieData({
      title: cookieData?.title || "",
      content: cookieData?.content || "",
      thumbnail: cookieData?.thumbnail || "",
      cookieId: cookieData?.id || -1,
    });

  const findDirId = (): number => {
    let selectedDir = pinnedDir.filter((dir) => dir.name === currDir);
    if (selectedDir.length > 0) return selectedDir[0].id;
    selectedDir = unpinnedDir.filter((dir) => dir.name === currDir);
    if (selectedDir.length > 0) return selectedDir[0].id;
    return -1;
  };

  const updateDirOfCookie = async (dirId: number) => {
    const body: CreateCookieToDirProps = {
      cookieId: cookieData.id || -1,
      directoryId: dirId,
    };
    if (body.directoryId) {
      const result = await cookieModule.updateDirOfCookie(
        body,
        cookieData.isPinned || false,
        type === "searched",
      );
      if (result) {
        setUpdatedDir({
          name: result?.directoryName || "",
          emoji: result?.directoryEmoji || "",
        });
        setCardState("parking");
        setTimeout(() => setCardState("normal"), 1500);
        await refreshDir();
      }
    }
  };

  const createAndUpdateDirOfCookie = async () => {
    if (!cookieData.directoryInfo?.name && currDir === "모든 쿠키") {
      return;
    }
    if (currDir !== cookieData.directoryInfo?.name) {
      const isNewDir =
        unpinnedDir.filter((dir) => dir.name === currDir).length === 0 &&
        pinnedDir.filter((dir) => dir.name === currDir).length === 0;
      if (isNewDir) {
        const dirId = await createDir({ name: currDir });
        await updateDirOfCookie(dirId);
      } else {
        await updateDirOfCookie(findDirId());
      }
    }
  };

  useEffect(() => {
    createAndUpdateDirOfCookie();
  }, [currDir]);

  useEffect(() => {
    initializeModal();
  }, [isUpdateModalOpen]);

  return (
    <>
      <CookieWrap
        id={id}
        className={className}
        onClick={() => {
          window.open(cookieData.link);
          cookieModule.updateCookieReadCnt(
            cookieData.id || -1,
            cookieData.isPinned || false,
            type === "searched",
          );
        }}
        onMouseEnter={() => {
          if (cardState === "normal" && !isLoading) setCardState("hover");
        }}
        onMouseLeave={() => {
          if (cardState === "hover" && !isLoading) setCardState("normal");
        }}
        ref={ref}
      >
        {isCookiePinned && <StyledPinImg className="pin_img" />}
        <CookieImg
          cardState={type === "dirShare" ? "normal" : cardState}
          cookieData={cookieData}
          updatedCookieData={updatedCookieData}
          setUpdatedCookieData={setUpdatedCookieData}
          isCookiePinned={isCookiePinned}
          setIsCookiePinned={setIsCookiePinned}
          updatedDirectory={updatedDir}
          copyCookieLink={cookieModule.copyCookieLink}
          updateCookiePin={(cookieId, isPinned) =>
            cookieModule.updateCookiePin(
              cookieId,
              isPinned,
              type === "searched",
            )
          }
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setIsUpdateModalOpen={setIsUpdateModalOpen}
        />
        {type !== "dirShare" &&
          (cardState === "hover" || cardState === "input") && (
            <div className="hover-div">
              <CookieHover
                unpinnedDir={unpinnedDir}
                pinnedDir={pinnedDir}
                setCardState={setCardState}
                currDir={
                  cookieData.directoryInfo?.emoji !== null
                    ? `${cookieData.directoryInfo?.emoji || ""} ${currDir}`
                    : currDir
                }
                setCurrDir={setCurrDir}
              />
            </div>
          )}
        <CookieContent className="cookie-content">
          <h1 className="title">{cookieData.title}</h1>
          <div className="desc">{cookieData.content}</div>
          <div style={{ flexGrow: 1 }} />
          <div className="profile">
            <Img
              className="profile__favicon"
              src={cookieData.favicon}
              type="favicon"
              alt="favicon"
            />
            <cite className="profile__author">{cookieData.provider}</cite>
          </div>
        </CookieContent>
      </CookieWrap>
      <CookieEditModal
        value={updatedCookieData}
        setValue={setUpdatedCookieData}
        updateCookie={() =>
          cookieModule.updateCookie(
            updatedCookieData,
            cookieData?.isPinned,
            type === "searched",
          )
        }
        onClickDelBtn={() => {
          setIsUpdateModalOpen(false);
          setIsDeleteModalOpen(true);
        }}
        setCardState={setCardState}
        isOpen={isUpdateModalOpen}
        setIsOpen={setIsUpdateModalOpen}
        isLoading={cookieModule.isUpdateLoading}
      />
      <DelModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        onClickDelBtn={() =>
          cookieModule.deleteCookie(
            cookieData?.id || -1,
            cookieData?.isPinned,
            type === "searched",
          )
        }
      />
    </>
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
    .cookie-content {
      .title {
        text-decoration: underline;
      }
    }
  }

  .hover-div {
    position: absolute;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const CookieContent = styled.section`
  padding: 12px 10px 46px 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  .title {
    all: unset;
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

  .desc {
    all: unset;
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

  .profile {
    line-height: normal;
    display: flex;
    align-items: center;
    &__author {
      all: unset;
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
`;

const StyledPinImg = styled(PinImg)`
  position: absolute;
  z-index: 6;
  transform: translate(24px, -5px);
  background-color: transparent;
  -webkit-filter: drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.1));
`;

export default forwardRef(Cookie);
