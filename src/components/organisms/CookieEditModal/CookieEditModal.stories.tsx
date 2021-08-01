import { useState } from "react";
import CookieEditModal from "./CookieEditModal";

export default {
  title: "components/organisms/CookieEditModal",
  component: CookieEditModal,
};

/** !쿠키 1개에 대한 export interface 만들어서 사용하기! */
interface ValueProps {
  title: string;
  content: string;
  thumbnail: string;
  cookieId: number | string;
  image?: File;
}
export const cookieEditModal = () => {
  const [value, setValue] = useState<ValueProps>({
    title: "",
    content: "",
    thumbnail: "",
    cookieId: 1,
  });
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const isLoading = false;

  return (
    <>
      {isOpen && (
        <CookieEditModal
          value={value}
          setValue={setValue}
          onClickSave={() => {}}
          onClickDel={() => {}}
          setIsError={setIsError}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

cookieEditModal.story = {
  name: "Default",
};
