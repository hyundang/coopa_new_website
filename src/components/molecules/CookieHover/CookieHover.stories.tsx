import { useState } from "react";
import CookieHover from ".";

export default {
  title: "components/molecules/cookieHover",
  component: CookieHover,
};

export const cookieHover = () => {
  const [cardState, setCardState] = useState("normal");
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
  return <CookieHover allDir={allDir} setCardState={setCardState} />;
};

export const cookieHoverEmpty = () => {
  const [cardState, setCardState] = useState("normal");
  return <CookieHover allDir={[]} setCardState={setCardState} />;
};

cookieHover.story = {
  name: "Default",
};
