import { Story, Meta } from "@storybook/react";
import My, { MyProps } from ".";

export default {
  title: "components/templates/My",
  component: My,
} as Meta;

const Template: Story<MyProps> = (args) => <My {...args} />;

export const Default = Template.bind({});
Default.args = {
  userData: {
    allCookies: 185,
    email: "hyunjin5697@gmail.com",
    introduction:
      "다섯글자임다섯글자임다섯글자임다섯글자임다섯글자임다섯글자임다섯글자임다섯글자임다섯글자임다섯글자임다섯글자임다섯글자임다섯글자임다섯글자임",
    name: "Hyunjin Lee",
    profileImage:
      "https://lh5.googleusercontent.com/-iKH4kcTU298/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnofwea1DKUZyF7cjUeO12bCL9LpA/s96-c/photo.jpg",
    readCount: 282,
  },
  profileData: {
    introduction:
      "다섯글자임다섯글자임다섯글자임다섯글자임다섯글자임다섯글자임다섯글자임다섯글자임다섯글자임다섯글자임다섯글자임다섯글자임다섯글자임다섯글자임",
    name: "Hyunjin Lee",
  },
};
