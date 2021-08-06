import { Story, Meta } from "@storybook/react";
import NotiModal, { NotiModalProps } from ".";

export default {
  title: "components/organisms/NotiModal",
  component: NotiModal,
} as Meta;

export const Template: Story<NotiModalProps> = (args) => (
  <NotiModal {...args} />
);
