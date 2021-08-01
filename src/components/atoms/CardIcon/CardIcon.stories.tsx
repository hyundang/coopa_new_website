import { ReactComponent as Icon } from "@assets/icons/card/cookie_icn_fix.svg";
import CardIcon from "./CardIcon";

export default {
  title: "components/atoms/CardIcon",
  component: CardIcon,
};

export const imgBox = () => {
  return (
    <CardIcon>
      <Icon fill="#FFFFFF" />
    </CardIcon>
  );
};

imgBox.story = {
  name: "Default",
};
