import { Story, Meta } from "@storybook/react";
import Homeboard, { HomeboardProps } from ".";

export default {
  title: "components/templates/Homeboard",
  component: Homeboard,
} as Meta;

const Template: Story<HomeboardProps> = (args) => {
  return <Homeboard {...args} />;
};

export const homeboard = Template.bind({});

export const homeboardWithBackground = Template.bind({});
homeboardWithBackground.args = {
  bookmarkData: [
    {
      id: 1,
      name: "naver",
      link: "https://www.naver.com",
      image: "	https://papago.naver.com/favicon.ico",
    },
    {
      id: 2,
      name: "naver",
      link: "https://www.naver.com",
      image: "	https://papago.naver.com/favicon.ico",
    },
    {
      id: 3,
      name: "naver",
      link: "https://www.naver.com",
      image: "	https://papago.naver.com/favicon.ico",
    },
  ],
};
