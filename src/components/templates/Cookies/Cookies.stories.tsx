import { Meta, Story } from "@storybook/react";
import Cookies, { CookiesProps } from ".";
import { cookies, mockCookieModule } from "@data/dummy/cookie";

export default {
  title: "components/templates/Cookies",
  component: Cookies,
} as Meta;

const Template: Story<CookiesProps> = (args) => {
  return (
    <Cookies
      {...args}
      isLoading={false}
      cookieModule={mockCookieModule}
      unpinnedDir={[]}
      pinnedDir={[]}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  pinnedCookieList: cookies,
  unpinnedCookieList: cookies,
};

export const empty = Template.bind({});
empty.args = {
  type: "normal",
  pinnedCookieList: [],
  unpinnedCookieList: [],
};

export const searchEmpty = Template.bind({});
searchEmpty.args = {
  type: "searched",
  pinnedCookieList: [],
  unpinnedCookieList: [],
};

export const dirDetail = Template.bind({});
dirDetail.args = {
  type: "dirDetail",
  pinnedCookieList: cookies,
  unpinnedCookieList: cookies,
};

export const SharedCookies = Template.bind({});
SharedCookies.args = {
  type: "dirShare",
  pinnedCookieList: cookies,
  unpinnedCookieList: cookies,
};
