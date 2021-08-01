import CookieImg from "./CookieImg";

export default {
  title: "components/molecules/cookieImg",
  component: CookieImg,
};

export const cookieHover = () => {
  return <CookieImg cardState="normal" />;
};

cookieHover.story = {
  name: "Default",
};
