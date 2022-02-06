import { FaviconIcon, fvcOnErrorImg } from "@assets/icons/card";
import { NoThumbImg } from "@assets/imgs/card";
import { ImgHTMLAttributes, useEffect, useState } from "react";

interface ImgProps extends ImgHTMLAttributes<HTMLImageElement> {
  type: "favicon" | "thumbnail" | "bookmark";
}
const Img = ({ className, alt, src, type }: ImgProps) => {
  const [fvc, setFvc] = useState<string>();

  useEffect(() => {
    setFvc(src);
  }, []);

  return (
    <img
      className={className}
      src={fvc}
      alt={alt}
      onError={() =>
        setFvc(
          type === "favicon"
            ? FaviconIcon
            : type === "bookmark"
            ? fvcOnErrorImg
            : NoThumbImg,
        )
      }
    />
  );
};

export default Img;
