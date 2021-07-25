// assets
import plusIcon from "@assets/icons/common/plus_white.svg";
// style
import { useState } from "react";
import ImgBox from "./ImgBox";

export default {
  title: "components/atoms/ImgBox",
  component: ImgBox,
};

export const imgBox = () => {
  return (
    <ImgBox style={{ width: "270px", height: "136px", borderRadius: "16px" }} />
  );
};

imgBox.story = {
  name: "Default",
};

export const cookieEditImgBox = () => {
  const [isHover, setIsHover] = useState(false);

  return (
    <ImgBox
      style={{
        width: "270px",
        height: "136px",
        borderRadius: "10px",
        border: `1px solid var(--gray_4)`,
      }}
      url="https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded"
      setIsHover={setIsHover}
    >
      {isHover && (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={plusIcon}
            alt="plus_icon"
            style={{ width: "24px", height: "24px" }}
          />
        </div>
      )}
    </ImgBox>
  );
};

export const homeBoardEditImgBox = () => {
  const [isHover, setIsHover] = useState(false);

  return (
    <ImgBox
      style={{
        width: "470px",
        height: "83px",
        borderRadius: "8px",
        border: `1px solid var(--gray_4)`,
      }}
      url="https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded"
      setIsHover={setIsHover}
    >
      {isHover && (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => console.log("hi")}
        >
          <img
            src={plusIcon}
            alt="plus_icon"
            style={{ width: "18px", height: "18px" }}
          />
        </div>
      )}
    </ImgBox>
  );
};
