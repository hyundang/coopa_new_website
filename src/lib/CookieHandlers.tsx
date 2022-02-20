import { CookieDataProps, UpdateCookieProps } from "@interfaces/cookie";
import CookieModule from "@modules/CookieModule";
import { useState } from "react";

const CookieHandlers = (
  type: "normal" | "searched" | "dirDetail" | "dirShare",
  cookieData: CookieDataProps,
  cookieModule: ReturnType<typeof CookieModule>,
) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);

  const [updatedCookieValue, setUpdatedCookieValue] =
    useState<UpdateCookieProps>({
      title: cookieData.title,
      content: cookieData.content,
      cookieId: cookieData.id,
      thumbnail: cookieData.thumbnail,
    });

  const handleClickCookieWrap = () => {
    cookieModule.updateCookieReadCnt(
      cookieData.id,
      cookieData.isPinned,
      type === "searched",
    );
    window.open(cookieData.link);
  };

  const handleClickPinIcon = () =>
    cookieModule.updateCookiePin(
      cookieData.id,
      cookieData.isPinned,
      type === "searched",
    );

  return {
    isEditModalOpen,
    setIsEditModalOpen,
    isDelModalOpen,
    setIsDelModalOpen,
    updatedCookieValue,
    setUpdatedCookieValue,
    handleClickCookieWrap,
    handleClickPinIcon,
  };
};

export default CookieHandlers;
