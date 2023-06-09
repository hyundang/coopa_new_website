// assets
import { PlusIcon } from "@assets/icons/common";
// style
import { useState } from "react";
import ImgBox from ".";

export default {
  title: "components/atoms/ImgBox",
  component: ImgBox,
};

export const imgBox = () => {
  const [isHover, setIsHover] = useState(false);
  return (
    <ImgBox
      style={{ width: "270px", height: "136px", borderRadius: "16px" }}
      isHover={isHover}
      setIsHover={setIsHover}
    />
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
      isHover={isHover}
      isImgInput
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
          <PlusIcon style={{ width: "24px", height: "24px" }} />
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
      isHover={isHover}
      isImgInput
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
          <PlusIcon style={{ width: "18px", height: "18px" }} />
        </div>
      )}
    </ImgBox>
  );
};
