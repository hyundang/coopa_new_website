import { useState } from "react";
import CookieHover from ".";

export default {
  title: "components/molecules/cookieHover",
  component: CookieHover,
};

export const cookieHover = () => {
  const [cardState, setCardState] = useState("normal");
  const [currDir, setCurrDir] = useState("모든쿠키");
  const unpinnedDir = [
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
  return (
    <CookieHover
      unpinnedDir={unpinnedDir}
      pinnedDir={unpinnedDir}
      setCardState={setCardState}
      currDir={currDir}
      setCurrDir={setCurrDir}
    />
  );
};

export const cookieHoverEmpty = () => {
  const [cardState, setCardState] = useState("normal");
  const [currDir, setCurrDir] = useState("모든쿠키");
  return (
    <CookieHover
      unpinnedDir={[]}
      setCardState={setCardState}
      currDir={currDir}
      setCurrDir={setCurrDir}
    />
  );
};

cookieHover.story = {
  name: "Default",
};
