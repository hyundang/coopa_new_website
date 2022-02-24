import { useState, useEffect, useCallback } from "react";

const useWindowSize = () => {
  const isClient = typeof window === "object";

  const getSize = () => {
    return {
      width: isClient ? window.innerWidth || window.screen.width : undefined,
      height: isClient ? window.innerHeight || window.screen.height : undefined,
    };
  };

  const getSizeCallBack = useCallback(getSize, [isClient]);

  const [windowSize, setWindowSize] = useState(getSizeCallBack);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    function handleResize() {
      setWindowSize(getSizeCallBack());
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [getSizeCallBack, isClient]);

  return windowSize;
};

export default useWindowSize;
