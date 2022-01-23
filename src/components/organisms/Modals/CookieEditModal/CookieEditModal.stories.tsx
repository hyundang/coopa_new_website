import { Meta, Story } from "@storybook/react";
import { useState } from "react";
import CookieEditModal, { CookieEditModalProps } from ".";

export default {
  title: "components/organisms/CookieEditModal",
  component: CookieEditModal,
} as Meta;

/** !쿠키 1개에 대한 export interface 만들어서 사용하기! */
interface ValueProps {
  title: string;
  content: string;
  thumbnail: string;
  cookieId: number;
  image?: File;
}
export const cookieEditModal: Story<CookieEditModalProps> = (args) => {
  const [value, setValue] = useState<ValueProps>({
    title: "",
    content: "",
    thumbnail: "",
    cookieId: 1,
  });
  const [isOpen, setIsOpen] = useState(true);
  const isLoading = false;

  return (
    <>
      {isOpen && (
        <CookieEditModal
          {...args}
          value={value}
          setValue={setValue}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isLoading={isLoading}
        />
      )}
    </>
  );
};
