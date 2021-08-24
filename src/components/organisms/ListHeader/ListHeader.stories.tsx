import { Story, Meta } from "@storybook/react";
import ListHeader, { ListHeaderProps } from ".";

export default {
  title: "components/organisms/ListHeader",
  component: ListHeader,
} as Meta;

const Template: Story<ListHeaderProps> = (args) => (
  <ListHeader
    {...args}
    nickname="쿠키파킹"
    imgUrl="https://coopa-default.s3.ap-northeast-2.amazonaws.com/og_thumbnail.png"
  />
);

export const CookieHeader = Template.bind({});
CookieHeader.args = {
  type: "cookie",
  filterType: "latest",
};

export const DirHeader = Template.bind({});
DirHeader.args = {
  type: "dir",
  filterType: "oldest",
};

export const DirDetailHeader = Template.bind({});
DirDetailHeader.args = {
  type: "dirDetail",
  filterType: "abc",
};

export const DirShareHeader = Template.bind({});
DirShareHeader.args = {
  type: "dirShare",
  filterType: "abc",
};
