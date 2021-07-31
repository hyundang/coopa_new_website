import { useState } from "react";
import styled from "styled-components";
import CardIcon from "@components/atoms/CardIcon/CardIcon";
import ImgBox from "@components/atoms/ImgBox/ImgBox";
import CookieHover from "@components/molecules/CookieHover/CookieHover";
import { ReactComponent as EditIcon } from "@assets/icons/card/icn_edit_white_32px.svg";
import { ReactComponent as LinkIcon } from "@assets/icons/card/icn_link_white_32px.svg";
import { ReactComponent as DeleteIcon } from "@assets/icons/card/icn_delete_white_32px.svg";

const Cookie = () => {
  const [isHover, setIsHover] = useState(false);
  return (
    <ImgBox
      style={{
        width: "270px",
        height: "136px",
        borderRadius: "10px",
        border: `1px solid var(--gray_4)`,
      }}
      url="https://i.ytimg.com/vi/C7sLwDOL1Vo/hqdefault.jpg"
      setIsHover={setIsHover}
    >
      {isHover && (
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
    </ImgBox>
  );
};

const HoverDiv = styled.div`
  .icons {
    display: flex;
  }
`;

export default Cookie;
