import { Meta, Story } from "@storybook/react";
import Cookie, { CookieProps } from ".";
import { cookie, mockCookieModule } from "@data/dummy/cookie";

export default {
  title: "components/organisms/Cookie",
  component: Cookie,
} as Meta;

export const Template270: Story<CookieProps> = (args) => {
  return (
    <div style={{ width: "270px" }}>
      <Cookie {...args} />
    </div>
  );
};
Template270.args = {
  type: "normal",
  cookieData: cookie,
  isLoading: false,
  cookieModule: mockCookieModule,
};
