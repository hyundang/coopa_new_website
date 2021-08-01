import CookieHover from "./CookieHover";

export default {
  title: "components/molecules/cookieHover",
  component: CookieHover,
};

export const cookieHover = () => {
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
  ];
  return <CookieHover allDir={allDir} />;
};

cookieHover.story = {
  name: "Default",
};
