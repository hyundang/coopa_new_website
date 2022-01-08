import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ImgBox, Icon } from "@components/atoms";
import { EditIcon, LinkIcon32 } from "@assets/icons/common";
import { DeleteIcon, PinAtvIcon, PinIcon } from "@assets/icons/card";
import { cookieimgAnimation } from "@components/animations";
import { CookieDataProps, PatchCookieProps } from "@interfaces/cookie";
import { CookieEditModal, DelModal } from "@components/organisms";
import { Dispatch, SetStateAction, useState } from "react";
import { PinImg } from "@assets/imgs/card";

export interface CookieImgProps {
  /** id */
  id?: string;
  /** className */
  className?: string;
  /** cookie card state */
  cardState: "hover" | "parking" | "normal" | "input";
  /** set cookie card state */
  setCardState: Dispatch<
    SetStateAction<"hover" | "parking" | "normal" | "input">
  >;
  /** cookie */
  cookie?: CookieDataProps;
  /** copy cookie handler */
  copyCookieLink: () => void;
  /** delete cookie handler */
  deleteCookieHanlder: (id: number) => Promise<void>;
  /** edit cookie handler */
  handleEditCookie: (data: FormData) => Promise<void>;
  /** 쿠키 수정 로딩 */
  isUpdateLoading: boolean;
  /** fix cookie handler */
  fixCookieHandler: () => void;
}

const CookieImg = ({
  id,
  className,
  cardState,
  setCardState,
  cookie,
  copyCookieLink,
  deleteCookieHanlder,
  handleEditCookie,
  isUpdateLoading,
  fixCookieHandler,
}: CookieImgProps) => {
  const [patchData, setPatchData] = useState<PatchCookieProps>({
    title: cookie?.title || "",
    content: cookie?.content || "",
    thumbnail: cookie?.thumbnail || "",
    cookieId: cookie?.id || -1,
  });
  const [isError, setIsError] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  // cookie 고정 여부
  const [isCookieFixed, setIsCookieFixed] = useState(false);

  const editIconClickHandler: React.MouseEventHandler<HTMLButtonElement> = () =>
    setIsEditOpen(true);

  const pinIconClickHandler = () => {
    // fixCookieHandler();
    setIsCookieFixed(!isCookieFixed);
  };

  return (
    <>
      {cardState === "hover" && isCookieFixed && (
        <StyledPinImg className="pin_img" />
      )}
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
              <Icon className="hover_icon" onClick={pinIconClickHandler}>
                {isCookieFixed ? (
                  <PinAtvIcon className="hover_icon__pin" />
                ) : (
                  <PinIcon className="hover_icon__pin" />
                )}
              </Icon>
              <Icon className="hover_icon" onClick={editIconClickHandler}>
                <EditIcon className="hover_icon__edit" />
              </Icon>
              <CopyToClipboard
                text={cookie?.link || ""}
                onCopy={copyCookieLink}
              >
                <Icon className="hover_icon">
                  <LinkIcon32 className="hover_icon__link" />
                </Icon>
              </CopyToClipboard>
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
              {cookie?.directoryInfo?.emoji && (
                <div className="parking--title__emoji">
                  {cookie.directoryInfo.emoji}
                </div>
              )}
              <div className="parking--title__name">
                {cookie?.directoryInfo?.name}
              </div>
            </div>
            <div className="parking--desc">에 파킹했어요!</div>
          </ParkingDiv>
        )}
      </StyledImgBox>
      <CookieEditModal
        value={patchData}
        setValue={setPatchData}
        handleEditCookie={handleEditCookie}
        onClickDel={() => {
          setIsEditOpen(false);
          setIsDeleteOpen(true);
        }}
        setCardState={setCardState}
        setIsError={setIsError}
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        isLoading={isUpdateLoading}
      />
      <DelModal
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        onClickDel={() => deleteCookieHanlder(cookie?.id || -1)}
      />
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
