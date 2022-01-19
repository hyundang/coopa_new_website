// assets
import { PinImg } from "@assets/imgs/card";
// components
import { CookieEditModal, DelModal } from "@components/organisms";
import { CookieContent } from "@components/molecules";
// interfaces
import { CookieDataProps } from "@interfaces/cookie";
// libs
import styled from "styled-components";
import React, { RefObject, forwardRef } from "react";
import CookieHandlers from "@lib/CookieHandlers";
// modules
import CookieModule from "@modules/CookieModule";
import { ImgBox } from "@components/atoms";

export interface CookieTabletProps {
  id?: string;
  className?: string;
  type: "normal" | "searched" | "dirDetail" | "dirShare";
  cookieData: CookieDataProps;
  cookieModule: ReturnType<typeof CookieModule>;
}
const CookieTablet = (
  { id, className, type, cookieData, cookieModule }: CookieTabletProps,
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
        {cookieData.isPinned && <StyledPinImg className="pin_img" />}
        <StyledImgBox
          id={id}
          className={className}
          cookieContent={cookieData?.content}
          url={cookieData?.thumbnail}
          isHover={false}
        />
        <StyledCookieContent
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
        updateCookie={() =>
          cookieModule.updateCookie(
            cookieHandlers.updatedCookieValue,
            cookieData.isPinned,
            type === "searched",
          )
        }
        onClickDelBtn={() => {
          cookieHandlers.setIsEditModalOpen(false);
          cookieHandlers.setIsDelModalOpen(true);
        }}
        isLoading={cookieModule.isUpdateLoading}
      />
      <DelModal
        isOpen={cookieHandlers.isDelModalOpen}
        setIsOpen={cookieHandlers.setIsDelModalOpen}
        onClickDelBtn={() =>
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
  display: flex;
  flex-direction: column;
`;

interface StyledImgBoxProps {
  cookieContent?: string;
}
const StyledImgBox = styled(ImgBox)<StyledImgBoxProps>`
  position: relative;
  width: 100%;
  padding-bottom: ${({ cookieContent }) =>
    cookieContent === "" ? "calc(180/270*100%)" : "calc(136/270*100%)"};
  border-radius: 10px;
`;

const StyledCookieContent = styled(CookieContent)`
  padding: 16px 8px 40px 8px;
`;

const StyledPinImg = styled(PinImg)`
  position: absolute;
  z-index: 2;
  transform: translate(24px, -5px);
  background-color: transparent;
  -webkit-filter: drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.1));
`;

export default forwardRef(CookieTablet);
