import { EmptyImg } from "@assets/imgs/common";
import { Story, Meta } from "@storybook/react";
import Empty, { EmptyProps } from ".";

export default {
  title: "components/organisms/Empty",
  component: Empty,
} as Meta;

const Template: Story<EmptyProps> = (args) => <Empty {...args} />;

export const DirDetail = Template.bind({});
DirDetail.args = {
  img: EmptyImg,
  imgWidth: 170,
  text: "새로운 쿠키를 저장해보세요!",
};

export const SearchedCookie = Template.bind({});
SearchedCookie.args = {
  img: EmptyImg,
  imgWidth: 170,
  text: "검색된 쿠키가 없어요 !",
};

export const SearchedDir = Template.bind({});
SearchedDir.args = {
  img: EmptyImg,
  imgWidth: 170,
  text: "검색된 디렉토리가 없어요 !",
};
