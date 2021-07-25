import { useState } from "react";
import DropDown from "./DropDown";
import List from "../List/List";
import Btn from "../Btn/Btn";

//mock data
const allDir = [
  {
    name: "블라블라",
    emoji: "😀",
  },
  {
    name: "블라블라",
    emoji: "",
  },
  {
    name: "블라블라",
    emoji: "😀",
  },
  {
    name: "블라블라",
    emoji: "😀",
  },
  {
    name: "블라블라",
    emoji: "😀",
  },
  {
    name: "블라블라",
    emoji: "😀",
  },
  {
    name: "블라블라",
    emoji: "😀",
  },
];

export default {
  title: "components | DropDown",
  component: DropDown,
};

export const CookieDropDown = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <DropDown
      selectedItem="디렉토리"
      style={{ width: "270px", padding: "14px" }}
      isActive={isActive}
      setIsActive={setIsActive}
    >
      <div>
        <List allDir={allDir} />
        <div>
          <Btn
            pcStyle={{
              width: "58px",
              height: "36px",
              borderRadius: "18px",
              fontSize: "13px",
            }}
            mobileStyle={{
              width: "70px",
              height: "48px",
              borderRadius: "24px",
              fontSize: "16px",
            }}
            onClick={() => console.log("hi")}
            isCookieDirBtn
            isOrange
          >
            저장
          </Btn>
        </div>
      </div>
    </DropDown>
  );
};

CookieDropDown.story = {
  name: "Default",
};
