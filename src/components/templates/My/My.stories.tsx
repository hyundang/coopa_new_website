import { Story, Meta } from "@storybook/react";
import My, { MyProps } from ".";

export default {
  title: "components/templates/My",
  component: My,
} as Meta;

const Template: Story<MyProps> = (args) => (
  <My
    {...args}
    onClickLogout={() => {}}
    editProfile={() => {}}
    setProfileData={() => {}}
    isOpen={false}
    setIsOpen={() => {}}
  />
);

export const Default = Template.bind({});
Default.args = {
  userData: {
    id: 33,
    name: "몽쉘",
    email: "",
    profileImage: "",
    introduction: "",
    cookieCount: 333,
    readCookieCnt: 33,
  },
  profileData: {
    name: "몽쉘",
    introduction: "",
  },
};
