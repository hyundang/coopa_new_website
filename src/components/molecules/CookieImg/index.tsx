import styled from "styled-components";
import { ImgBox, Icon } from "@components/atoms";
import { EditIcon, LinkIcon32 } from "@assets/icons/common";
import { DeleteIcon } from "@assets/icons/card";
import { cookieimgAnimation } from "@components/animations";

export interface CookieImgProps {
  /** id */
  id?: string;
  /** className */
  className?: string;
  /** cookie card state */
  cardState: "hover" | "parking" | "normal" | "input";
  /** cookie thumbnail url */
  url?: string;
}
const CookieImg = ({ id, className, cardState }: CookieImgProps) => {
  return (
    <ImgBox
      id={id}
      className={className}
      style={{
        width: "270px",
        height: "136px",
        borderRadius: "10px",
        border: `1px solid var(--gray_4)`,
      }}
      url="https://i.ytimg.com/vi/C7sLwDOL1Vo/hqdefault.jpg"
      isHover={cardState === "hover"}
    >
      {cardState === "hover" && (
        <HoverDiv>
          <div className="hover_icon_wrap">
            <Icon className="hover_icon">
              <EditIcon className="hover_icon__edit" />
            </Icon>
            <Icon className="hover_icon">
              <LinkIcon32 className="hover_icon__link" />
            </Icon>
            <Icon className="hover_icon">
              <DeleteIcon className="hover_icon__delete" />
            </Icon>
          </div>
        </HoverDiv>
      )}
      {cardState === "parking" && (
        <ParkingDiv>
          <div className="parking--title">
            {/* {cookies.directoryInfo?.emoji && (
              <div className="parking--title__emoji">
                {cookies.directoryInfo.emoji}
              </div>
            )} */}
            <div className="parking--title__emoji">😀</div>
            <div className="parking--title__name">유저 인터페이스</div>
          </div>
          <div className="parking--desc">에 파킹했어요!</div>
        </ParkingDiv>
      )}
    </ImgBox>
  );
};

export default CookieImg;

const HoverDiv = styled.div`
  position: relative;
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
  position: relative;
  border-radius: 12px;
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
