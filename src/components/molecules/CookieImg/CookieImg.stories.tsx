import { Story, Meta } from "@storybook/react";
import CookieImg, { CookieImgProps } from ".";

export default {
  title: "components/molecules/cookieImg",
  component: CookieImg,
} as Meta;

const Template: Story<CookieImgProps> = (args) => <CookieImg {...args} />;

export const cookieHover = Template.bind({});
cookieHover.args = {
  cardState: "hover",
};
