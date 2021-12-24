import { useState } from "react";
import HomeboardEditModal from ".";

export default {
  title: "components/organisms/HomeboardEditModal",
  component: HomeboardEditModal,
};

export const homeboardEditModal = () => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [isError, setIsError] = useState(false);
  const [homeboardImg, setHomeboardImg] = useState("");

  return (
    <>
      {isOpen && (
        <HomeboardEditModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setIsError={setIsError}
          value={value}
          setValue={setValue}
          setHomeboardImg={setHomeboardImg}
          postHomeboardImg={(e: File) => "hi"}
        />
      )}
    </>
  );
};

homeboardEditModal.story = {
  name: "Default",
};
