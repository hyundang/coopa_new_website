import Cookie from "./Cookie";

export default {
  title: "components/molecules/cookie",
  component: Cookie,
};

export const cookieHover = () => {
  return <Cookie />;
};

cookieHover.story = {
  name: "Default",
};
