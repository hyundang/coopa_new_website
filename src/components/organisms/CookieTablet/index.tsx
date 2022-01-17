// assets
import { NoThumbImg, PinImg } from "@assets/imgs/card";
// components
import { CookieEditModal, DelModal } from "@components/organisms";
import { CookieContent } from "@components/molecules";
// interfaces
import { CookieDataProps } from "@interfaces/cookie";
// libs
import styled from "styled-components";
import React, { SyntheticEvent, RefObject, forwardRef } from "react";
import CookieHandlers from "@lib/CookieHandlers";
// modules
import CookieModule from "@modules/CookieModule";

export interface CookieMobileProps {
  id?: string;
  className?: string;
  type: "normal" | "searched" | "dirDetail" | "dirShare";
  cookieData: CookieDataProps;
  cookieModule: ReturnType<typeof CookieModule>;
}
const CookieMobile = (
  { id, className, type, cookieData, cookieModule }: CookieMobileProps,
  ref?:
    | ((instance: HTMLButtonElement | null) => void)
    | RefObject<HTMLButtonElement>
    | null
    | undefined,
) => {
  const cookieHandlers = CookieHandlers(type, cookieData, cookieModule);

  return (
    <>
      <CookieWrap
        id={id}
        className={className}
        onClick={() => {
          cookieModule.updateCookieReadCnt(
            cookieData.id,
            cookieData.isPinned,
            type === "searched",
          );
          window.open(cookieData.link);
        }}
        ref={ref}
      >
        <div className="thumbnail-wrap">
          {cookieData.isPinned && <StyledPinImg className="pin_img" />}
          <img
            alt="cookie-thumbnail"
            className="thumbnail"
            src={cookieData.thumbnail}
            onError={(e: SyntheticEvent<HTMLImageElement, Event>) =>
              (e.currentTarget.src = NoThumbImg)
            }
          />
        </div>
        <CookieContent
          type={type}
          cookieData={cookieData}
          onClickPinIcon={cookieHandlers.handleClickPinIcon}
          onClickEditIcon={() => cookieHandlers.setIsEditModalOpen(true)}
          onClickShareIcon={cookieModule.copyCookieLink}
          onClickDelIcon={() => cookieHandlers.setIsDelModalOpen(true)}
        />
      </CookieWrap>
      <CookieEditModal
        isOpen={cookieHandlers.isEditModalOpen}
        setIsOpen={cookieHandlers.setIsEditModalOpen}
        value={cookieHandlers.updatedCookieValue}
        setValue={cookieHandlers.setUpdatedCookieValue}
        updateCookie={(formData) =>
          cookieModule.updateCookie(
            formData,
            cookieData.isPinned,
            type === "searched",
          )
        }
        onClickDel={() => {
          cookieHandlers.setIsEditModalOpen(false);
          cookieHandlers.setIsDelModalOpen(true);
        }}
        isLoading={cookieModule.isUpdateLoading}
      />
      <DelModal
        isOpen={cookieHandlers.isDelModalOpen}
        setIsOpen={cookieHandlers.setIsDelModalOpen}
        onClickDel={() =>
          cookieModule.deleteCookie(
            cookieData.id,
            cookieData.isPinned,
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
  padding: 28px 0;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;

  .thumbnail-wrap {
    width: 270px;
    height: 136px;
    margin-bottom: 16px;
    .thumbnail {
      width: 270px;
      height: 136px;
      border-radius: 8px;
      object-fit: cover;
    }
  }
`;

const StyledPinImg = styled(PinImg)`
  position: absolute;
  z-index: 2;
  transform: translate(24px, -5px);
  background-color: transparent;
  -webkit-filter: drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.1));
`;

export default forwardRef(CookieMobile);
