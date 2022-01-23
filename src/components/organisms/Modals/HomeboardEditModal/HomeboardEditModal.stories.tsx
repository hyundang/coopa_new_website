import { useState } from "react";
import HomeboardEditModal from ".";

export default {
  title: "components/organisms/HomeboardEditModal",
  component: HomeboardEditModal,
};

export const homeboardEditModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {isOpen && (
        <HomeboardEditModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          updateHomeboardImg={async () => ""}
          locationX={0}
          setIsUpdatingSuccess={async () => {}}
          setIsUpdatingError={() => {}}
        />
      )}
    </>
  );
};

homeboardEditModal.story = {
  name: "Default",
};
