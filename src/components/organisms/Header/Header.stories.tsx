import { Story, Meta } from "@storybook/react";
import Header, { HeaderProps } from ".";

export default {
  title: "components/organisms/Header",
  component: Header,
};

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const header = Template.bind({});
header.args = {
  imgUrl:
    "https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png",
};
