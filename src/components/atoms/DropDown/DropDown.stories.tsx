import { useState } from "react";
import DropDown from "./DropDown";
import List from "../List/List";

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
      <p>
        <List />
      </p>
    </DropDown>
  );
};

CookieDropDown.story = {
  name: "Default",
};
