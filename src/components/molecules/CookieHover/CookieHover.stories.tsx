import { useState } from "react";
import CookieHover from ".";

export default {
  title: "components/molecules/cookieHover",
  component: CookieHover,
};

export const cookieHover = () => {
  const [currDir, setCurrDir] = useState("모든쿠키");

  return (
    <CookieHover
      unpinnedDir={[]}
      pinnedDir={[]}
      setCardState={() => {}}
      currDir={currDir}
      setCurrDir={setCurrDir}
    />
  );
};

export const cookieHoverEmpty = () => {
  const [currDir, setCurrDir] = useState("모든쿠키");
  return (
    <CookieHover
      unpinnedDir={[]}
      setCardState={() => {}}
      currDir={currDir}
      setCurrDir={setCurrDir}
      pinnedDir={[]}
    />
  );
};

cookieHover.story = {
  name: "Default",
};
