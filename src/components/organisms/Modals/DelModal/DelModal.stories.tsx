import { Story, Meta } from "@storybook/react";
import { useState } from "react";
import DelModal, { DelModalProps } from ".";

export default {
  title: "components/organisms/DelModal",
  component: DelModal,
} as Meta;

const Template: Story<DelModalProps> = (args) => {
  const [isOpen, setIsOpen] = useState(true);
  return <DelModal {...args} isOpen={isOpen} setIsOpen={setIsOpen} />;
};
export const CookieDelModal = Template.bind({});
// DelModal.args = {
// };
export const DirDelModal = Template.bind({});
DirDelModal.args = {
  type: "directory",
};
