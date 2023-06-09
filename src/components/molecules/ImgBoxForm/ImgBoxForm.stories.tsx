import { ChangeEvent, useRef, useState } from "react";
import ImgBoxForm from ".";

export default {
  title: "components/molecules/ImgBoxForm",
  component: ImgBoxForm,
};

export const imgBoxForm = () => {
  const [isHover, setIsHover] = useState(false);
  const isLoading = true;

  const img_input = useRef(null);

  const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files && console.log(e.target.files[0]);
  };

  return (
    <ImgBoxForm
      imgUrl="https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded"
      isHover={isHover}
      setIsHover={setIsHover}
      isLoading={isLoading}
      plusSize={24}
      cookieSize={40}
      ref={img_input}
      onChangeImg={handleChangeImg}
    />
  );
};

imgBoxForm.story = {
  name: "Cookie Edit Modal Img Box",
};

export const HomeboardEditImgBoxForm = () => {
  const [isHover, setIsHover] = useState(false);
  const isLoading = false;

  const img_input = useRef(null);

  const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files && console.log(e.target.files[0]);
  };

  return (
    <ImgBoxForm
      imgUrl="https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded"
      isHover={isHover}
      setIsHover={setIsHover}
      isLoading={isLoading}
      plusSize={18}
      cookieSize={36}
      ref={img_input}
      onChangeImg={handleChangeImg}
    />
  );
};
