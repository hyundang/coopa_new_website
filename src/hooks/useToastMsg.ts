import { useState } from "react";

const useToastMsg = () => {
  const [isVisible, setIsVisible] = useState({
    dirCreate: false,
    dirDel: false,
    dirEdit: false,
    cookieDel: false,
    cookieEdit: false,
    bookmarkDel: false,
    bookmarkCreate: false,
    homeboardEdit: false,
    imgSizeOver: false,
    copyLink: false,
    copyShareLink: false,
  });

  return { isVisible, setIsVisible };
};

export default useToastMsg;
