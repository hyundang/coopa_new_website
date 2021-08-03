import styled, { keyframes } from "styled-components";
import CardIcon from "@components/atoms/CardIcon/CardIcon";
import ImgBox from "@components/atoms/ImgBox/ImgBox";
import { ReactComponent as EditIcon } from "@assets/icons/card/icn_edit_white_32px.svg";
import { ReactComponent as LinkIcon } from "@assets/icons/card/icn_link_white_32px.svg";
import { ReactComponent as DeleteIcon } from "@assets/icons/card/icn_delete_white_32px.svg";

export interface IProps {
  cardState: string;
  content: string;
}
const Cookie = ({ cardState, content }: IProps) => {
  return (
    <ImgBox
      style={{
        width: "100%",
        paddingBottom:
          content === "" ? "calc(180/270*100%)" : "calc(136/270*100%)",
        borderRadius: "10px",
        border: `1px solid var(--gray_4)`,
      }}
      url="https://i.ytimg.com/vi/C7sLwDOL1Vo/hqdefault.jpg"
    >
      {cardState === "hover" && (
        <HoverDiv>
          <div className="icons">
            <CardIcon>
              <EditIcon />
            </CardIcon>
            <CardIcon>
              <LinkIcon />
            </CardIcon>
            <CardIcon>
              <DeleteIcon />
            </CardIcon>
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

const HoverDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  .icons {
    display: flex;
    position: absolute;
    bottom: 8px;
    right: 8px;
  }
`;
const fadeinout = keyframes`
  0% {
    opacity: 0;
  }
  50%{
    opacity: 1;
  }
  70%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
`;
const ParkingDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  border-radius: 1.2rem;
  z-index: 5;
  background: rgba(0, 0, 0, 0.55);
  width: 100%;
  height: 100%;
  animation: ${fadeinout} 1.5s infinite;
  .parking--title {
    display: flex;
    justify-content: center;
    &__emoji {
      width: 2rem;
      margin-right: 0.6rem;
      font-size: 2rem;
      line-height: 2.9rem;
    }
    &__name {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      line-height: 2.9rem;
      font-size: 1.8rem;
      max-width: 22.5rem;
      letter-spacing: -0.02em;
      color: var(--white);
    }
  }
  .parking--desc {
    margin-top: 0.4rem;
    text-align: center;
    font-size: 15px;
    line-height: 18px;
    color: #ffffff;
  }
`;

export default Cookie;
