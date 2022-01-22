// assets
import { EditIcon, LinkIcon32 } from "@assets/icons/common";
import { DeleteIcon, PinAtvIcon, PinIcon } from "@assets/icons/card";
import { PinImg } from "@assets/imgs/card";
// components
import { ImgBox, Icon } from "@components/atoms";
import { cookieimgAnimation } from "@components/animations";
// interfaces
import { CookieDataProps, UpdateCookieProps } from "@interfaces/cookie";
// libs
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import React, { Dispatch, SetStateAction, useState } from "react";

export interface CookieImgProps {
  id?: string;
  className?: string;
  cardState: "hover" | "parking" | "normal" | "input";
  cookieData?: CookieDataProps;
  updatedCookieData: UpdateCookieProps;
  setUpdatedCookieData: Dispatch<SetStateAction<UpdateCookieProps>>;
  updatedDirectory: {
    name: string;
    emoji: string;
  };
  copyCookieLink: () => void;
  updateCookiePin: (cookieId: number, isPinned: boolean) => Promise<boolean>;
  setIsUpdateModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
}

const CookieImg = ({
  id,
  className,
  cardState,
  cookieData,
  updatedCookieData,
  setUpdatedCookieData,
  updatedDirectory,
  copyCookieLink,
  updateCookiePin,
  setIsUpdateModalOpen,
  setIsDeleteModalOpen,
}: CookieImgProps) => {
  // cookie 고정 여부
  const [isCookiePinned, setIsCookiePinned] = useState(
    cookieData?.isPinned || false,
  );

  const handleClickEditIcon: React.MouseEventHandler<HTMLButtonElement> =
    () => {
      setIsUpdateModalOpen(true);
      setUpdatedCookieData({
        ...updatedCookieData,
        cookieId: cookieData?.id || -1,
      });
    };

  const handleClickPinIcon = async () => {
    const res = await updateCookiePin(
      cookieData?.id || -1,
      cookieData?.isPinned || false,
    );
    if (res) setIsCookiePinned(!isCookiePinned);
  };

  return (
    <>
      {cardState === "hover" && isCookiePinned && (
        <StyledPinImg className="pin_img" />
      )}
      <StyledImgBox
        id={id}
        className={className}
        cookieContent={cookieData?.content}
        url={cookieData?.thumbnail}
        isHover={cardState === "hover"}
      >
        {cardState === "hover" && (
          <HoverDiv>
            <div className="hover_icon_wrap">
              <Icon className="hover_icon" onClick={handleClickPinIcon}>
                {isCookiePinned ? (
                  <PinAtvIcon className="hover_icon__pin" />
                ) : (
                  <PinIcon className="hover_icon__pin" />
                )}
              </Icon>
              <Icon className="hover_icon" onClick={handleClickEditIcon}>
                <EditIcon className="hover_icon__edit" />
              </Icon>
              <CopyToClipboard
                text={cookieData?.link || ""}
                onCopy={copyCookieLink}
              >
                <Icon className="hover_icon">
                  <LinkIcon32 className="hover_icon__link" />
                </Icon>
              </CopyToClipboard>
              <Icon className="hover_icon">
                <DeleteIcon
                  className="hover_icon__delete"
                  onClick={() => setIsDeleteModalOpen(true)}
                />
              </Icon>
            </div>
          </HoverDiv>
        )}
        {cardState === "parking" && (
          <ParkingDiv>
            <div className="parking--title">
              {updatedDirectory.emoji && (
                <div className="parking--title__emoji">
                  {updatedDirectory.emoji}
                </div>
              )}
              <div className="parking--title__name">
                {updatedDirectory.name}
              </div>
            </div>
            <div className="parking--desc">에 파킹했어요!</div>
          </ParkingDiv>
        )}
      </StyledImgBox>
    </>
  );
};

export default CookieImg;

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

const StyledPinImg = styled(PinImg)`
  position: absolute;
  z-index: 2;
  transform: translate(24px, -5px);
  background-color: transparent;
  -webkit-filter: drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.1));
`;

const HoverDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  .hover_icon_wrap {
    display: flex;
    position: absolute;
    bottom: 8px;
    right: 8px;
    .hover_icon {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      background-color: transparent;
      -webkit-filter: drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.9));
      &:hover {
        background-color: rgba(243, 243, 243, 0.4);
        -webkit-filter: none;
      }
    }
  }
`;

const ParkingDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 12px;
  position: absolute;
  z-index: 5;
  background: rgba(0, 0, 0, 0.55);
  width: 100%;
  height: 100%;
  animation: ${cookieimgAnimation.fadeInOutRule};
  .parking--title {
    display: flex;
    justify-content: center;
    &__emoji {
      width: 20px;
      margin-right: 6px;
      font-size: 20px;
      line-height: 29px;
    }
    &__name {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      line-height: 29px;
      font-size: 18px;
      max-width: 225px;
      color: var(--white);
    }
  }
  .parking--desc {
    margin-top: 4px;
    text-align: center;
    font-size: 15px;
    line-height: 18px;
    color: #ffffff;
  }
`;
