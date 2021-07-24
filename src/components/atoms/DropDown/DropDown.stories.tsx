import DropDown from "./DropDown";

export default {
  title: "components | DropDown",
  component: DropDown,
};

export const CookieDropDown = () => {
  return (
    <DropDown
      selectedItem="디렉토리"
      style={{ width: "270px", padding: "14px" }}
    />
  );
};

CookieDropDown.story = {
  name: "Default",
};
