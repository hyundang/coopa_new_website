import { Story, Meta } from "@storybook/react";
import Newtab, { NewtablProps } from ".";

export default {
  title: "components/templates/Newtab",
  component: Newtab,
} as Meta;

const Template: Story<NewtablProps> = (args) => (
  <Newtab
    {...args}
    imgUrl="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
  />
);

export const empty = Template.bind({});
empty.args = {
  bookmarkDatas: [],
};

export const withBookmark = Template.bind({});
withBookmark.args = {
  bookmarkDatas: [
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
