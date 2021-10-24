import { Story, Meta } from "@storybook/react";
import { useState } from "react";
import CookieAddModal, { CookieAddModalProps } from ".";

export default {
  title: "components/organisms/CookieAddModal",
  component: CookieAddModal,
} as Meta;

const Template: Story<CookieAddModalProps> = (args) => {
  const [isOpen, setIsOpen] = useState(true);
  return <CookieAddModal {...args} isOpen={isOpen} setIsOpen={setIsOpen} />;
};

export const Default = Template.bind({});
