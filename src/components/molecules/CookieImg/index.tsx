import styled from "styled-components";
import { ImgBox, Icon } from "@components/atoms";
import { EditIcon, LinkIcon32 } from "@assets/icons/common";
import { DeleteIcon } from "@assets/icons/card";
import { cookieimgAnimation } from "@components/animations";
import { CookieDataProps } from "@interfaces/cookie";
import { CookieEditModal, DelModal } from "@components/organisms";
import { Dispatch, SetStateAction, useState } from "react";

export interface CookieImgProps {
  /** id */
  id?: string;
  /** className */
  className?: string;
  /** cookie card state */
  cardState: "hover" | "parking" | "normal" | "input";
  /** cookie */
  cookie: CookieDataProps;
  /** set cookie */
  setCookie: Dispatch<SetStateAction<CookieDataProps>>;
}

const CookieImg = ({
  id,
  className,
  cardState,
  cookie,
  setCookie,
}: CookieImgProps) => {
  const [isError, setIsError] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const isLoading = false;

  const editIconClickHandler: React.MouseEventHandler<HTMLButtonElement> = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => setIsEditOpen(true);

  return (
    <>
      <StyledImgBox
        id={id}
        className={className}
        cookieContent={cookie?.content}
        url={cookie?.thumbnail}
        isHover={cardState === "hover"}
      >
        {cardState === "hover" && (
          <HoverDiv>
            <div className="hover_icon_wrap">
              <Icon className="hover_icon" onClick={editIconClickHandler}>
                <EditIcon className="hover_icon__edit" />
              </Icon>
              <Icon className="hover_icon">
                <LinkIcon32 className="hover_icon__link" />
              </Icon>
              <Icon className="hover_icon">
                <DeleteIcon
                  className="hover_icon__delete"
                  onClick={() => setIsDeleteOpen(true)}
                />
              </Icon>
            </div>
          </HoverDiv>
        )}
        {cardState === "parking" && (
          <ParkingDiv>
            <div className="parking--title">
              {cookie.directoryInfo?.emoji && (
                <div className="parking--title__emoji">
                  {cookie.directoryInfo.emoji}
                </div>
              )}
              <div className="parking--title__name">
                {cookie.directoryInfo?.name}
              </div>
            </div>
            <div className="parking--desc">에 파킹했어요!</div>
          </ParkingDiv>
        )}
      </StyledImgBox>
      <CookieEditModal
        value={cookie}
        setValue={setCookie}
        onClickSave={() => {
          //data 처리 내용
          setIsEditOpen(false);
        }}
        onClickDel={() => {
          setIsEditOpen(false);
          setIsDeleteOpen(true);
        }}
        setIsError={setIsError}
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        isLoading={isLoading}
      />
      <DelModal
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        onClickDel={() => {}}
      />
    </>
  );
};

export default CookieImg;

interface StyledImgBoxProps {
  cookieContent: string;
}
const StyledImgBox = styled(ImgBox)<StyledImgBoxProps>`
  position: relative;
  width: 100%;
  padding-bottom: ${({ cookieContent }) =>
    cookieContent === "" ? "calc(180/270*100%)" : "calc(136/270*100%)"};
  border-radius: 10px;
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
