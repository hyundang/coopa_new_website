import { NotiIcon } from "@assets/icons/Header";
import { Story, Meta } from "@storybook/react";
import Icon, { IconProps } from "./Icon";
// assets

export default {
  title: "components/atoms/Icon",
  component: Icon,
} as Meta;

const Template: Story<IconProps> = (args) => (
  <Icon {...args}>
    <NotiIcon style={{ width: "22px", height: "22px" }} />
  </Icon>
);

export const notiIcon = Template.bind({});
notiIcon.args = {
  style: { width: "40px", height: "40px", borderRadius: "20px" },
};
