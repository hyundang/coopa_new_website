import { UpdateUserProps } from "@interfaces/user";
import { Story, Meta } from "@storybook/react";
import { useState } from "react";
import ProfileEditModal, { ProfileEditModalProps } from ".";

export default {
  title: "components/organisms/ProfileEditModal",
  component: ProfileEditModal,
} as Meta;

const Template: Story<ProfileEditModalProps> = (args) => {
  const [value, setValue] = useState<UpdateUserProps>({
    name: "",
    introduction: "",
  });
  const [isOpen, setIsOpen] = useState(true);
  return (
    <ProfileEditModal
      {...args}
      value={value}
      setValue={setValue}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    />
  );
};
export const profileEditModal = Template.bind({});
