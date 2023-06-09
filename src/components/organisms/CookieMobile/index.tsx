// assets
import { PinImg } from "@assets/imgs/card";
// components
import { CookieEditModal, DelModal } from "@components/organisms";
import { CookieContent } from "@components/molecules";
import { Img } from "@components/atoms";
// interfaces
import { CookieDataProps } from "@interfaces/cookie";
// libs
import styled from "styled-components";
import React, { RefObject, forwardRef, useEffect } from "react";
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

  const initializeModal = () =>
    cookieHandlers.isEditModalOpen &&
    cookieHandlers.setUpdatedCookieValue({
      title: cookieData?.title || "",
      content: cookieData?.content || "",
      thumbnail: cookieData?.thumbnail || "",
      cookieId: cookieData?.id || -1,
    });

  const handleUpdateCookie = () =>
    cookieModule.updateCookie(
      cookieHandlers.updatedCookieValue,
      cookieData.isPinned,
      type === "searched",
    );

  const handleClickDelBtnInEditModal = () => {
    cookieHandlers.setIsEditModalOpen(false);
    cookieHandlers.setIsDelModalOpen(true);
  };

  const handleClickDelBtnInDelModal = () =>
    cookieModule.deleteCookie(
      cookieData.id,
      cookieData.isPinned,
      type === "searched",
    );

  useEffect(() => {
    initializeModal();
  }, [cookieHandlers.isEditModalOpen]);

  return (
    <>
      <CookieWrap
        id={id}
        className={className}
        onClick={cookieHandlers.handleClickCookieWrap}
        ref={ref}
      >
        <div className="cookie-img">
          {cookieData.isPinned && <StyledPinImg className="pin_img" />}
          <Img
            alt="cookie-thumbnail"
            className="thumbnail"
            type="thumbnail"
            src={cookieData.thumbnail}
          />
        </div>
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
        updateCookie={handleUpdateCookie}
        onClickDelBtn={handleClickDelBtnInEditModal}
        isLoading={cookieModule.isUpdateLoading}
      />
      <DelModal
        isOpen={cookieHandlers.isDelModalOpen}
        setIsOpen={cookieHandlers.setIsDelModalOpen}
        onClickDelBtn={handleClickDelBtnInDelModal}
      />
    </>
  );
};

export default forwardRef(CookieMobile);

const CookieWrap = styled.article`
  cursor: pointer;
  position: relative;
  width: 100%;
  padding: 28px 0;
  border-bottom: 1px solid var(--gray_3);
  display: flex;
  flex-direction: row;

  .cookie-img {
    width: 108px;
    height: 72px;
    margin-right: 18px;
    .thumbnail {
      width: 108px;
      height: 72px;
      border-radius: 8px;
      object-fit: cover;
    }
  }
`;

const StyledCookieContent = styled(CookieContent)`
  .profile {
    margin-top: 24px;
  }
`;

const StyledPinImg = styled(PinImg)`
  position: absolute;
  z-index: 2;
  transform: translate(9px, -4px);
  width: 18px;
  height: 21px;
  background-color: transparent;
  -webkit-filter: drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.1));
`;
