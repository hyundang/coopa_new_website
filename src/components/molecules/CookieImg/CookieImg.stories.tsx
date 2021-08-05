import CookieImg from ".";

export default {
  title: "components/molecules/cookieImg",
  component: CookieImg,
};

export const cookieHover = () => {
  return <CookieImg cardState="hover" />;
};

cookieHover.story = {
  name: "Default",
};
