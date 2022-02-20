import { cookies, mockCookieModule } from "@data/dummy/cookie";
import { Meta, Story } from "@storybook/react";
import DirDetail, { DirDetailProps } from ".";

export default {
  title: "components/templates/DirDetail",
  component: DirDetail,
} as Meta;

const Template: Story<DirDetailProps> = (args) => <DirDetail {...args} />;

export const dirDetail = Template.bind({});
dirDetail.args = {
  nickname: "희수 친구 채린",
  dirInfo: {
    id: 333,
    name: "sample",
  },
  cookieModule: mockCookieModule,
  unpinnedCookieList: cookies,
};
