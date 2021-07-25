import { useState } from "react";
import BookmarkAddModal from "./BookmarkAddModal";

export default {
  title: "components | BookmarkAddModal",
  component: BookmarkAddModal,
};

export const bookmarkAddModal = () => {
  const [value, setValue] = useState({
    link: "",
    name: "",
  });
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {isOpen && (
        <BookmarkAddModal
          value={value}
          setValue={setValue}
          setIsOpen={setIsOpen}
          onClickSave={() => {}}
        />
      )}
    </>
  );
};

bookmarkAddModal.story = {
  name: "Default",
};
