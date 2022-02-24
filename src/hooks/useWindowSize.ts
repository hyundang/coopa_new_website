import { useState, useEffect, useCallback } from "react";

const useWindowSize = () => {
  const isClient = typeof window === "object";

  const getSize = () => {
    return {
      width: isClient ? document.documentElement.clientWidth : undefined,
      height: isClient ? document.documentElement.clientHeight : undefined,
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
    // @ts-ignore
    return () => window.removeEventListener("resize", handleResize);
  }, [getSizeCallBack, isClient]);

  return windowSize;
};

export default useWindowSize;
