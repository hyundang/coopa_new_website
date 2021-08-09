import CookieImg from ".";

export default {
  title: "components/molecules/cookieImg",
  component: CookieImg,
};

export const cookieHover = () => {
  return <CookieImg cardState="hover" content="" />;
};

cookieHover.story = {
  name: "Default",
};
