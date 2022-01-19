import { Meta, Story } from "@storybook/react";
import { useState } from "react";
import BookmarkAddModal, { BookmarkAddModalProps } from ".";

export default {
  title: "components/organisms/BookmarkAddModal",
  component: BookmarkAddModal,
} as Meta;

export const detfault: Story<BookmarkAddModalProps> = (args) => {
  const [value, setValue] = useState({
    link: "",
    name: "",
  });
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {isOpen && (
        <BookmarkAddModal
          {...args}
          className="bookmark-add-modal"
          value={value}
          setValue={setValue}
          // isOpen={isOpen}
          setIsOpen={setIsOpen}
          onClickSave={() => {}}
        />
      )}
    </>
  );
};
