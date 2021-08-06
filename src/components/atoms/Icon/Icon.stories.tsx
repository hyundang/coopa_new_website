import { NotiIcon } from "@assets/icons/Header";
import { SettingIcon } from "@assets/icons/homeboard";
import { Story, Meta } from "@storybook/react";
import styled from "styled-components";
import Icon, { IconProps } from ".";
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

export const settingIcon = () => (
  <StyledIcon>
    <SettingIcon style={{ width: "22px", height: "22px" }} />
  </StyledIcon>
);

const StyledIcon = styled(Icon)`
  position: absolute;
  z-index: 2;
  top: 18px;
  left: 0;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: rgba(243, 243, 243, 0.5);
  &:hover {
    top: 17px;
    left: -1px;
    width: 42px;
    height: 42px;
    border-radius: 21px;
    background: rgba(85, 83, 82, 0.35);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
`;
