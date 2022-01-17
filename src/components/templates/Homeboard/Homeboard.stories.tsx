import { Story, Meta } from "@storybook/react";
import { useState } from "react";
import Homeboard, { HomeboardProps } from ".";

export default {
  title: "components/templates/Homeboard",
  component: Homeboard,
} as Meta;

const Template: Story<HomeboardProps> = (args) => {
  const [visible, setVisible] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [img, setImg] = useState("");
  const [toastMsg, setToastMsg] = useState(false);
  return (
    <Homeboard
      {...args}
      visible={visible}
      setVisible={setVisible}
      isSearched={isSearched}
      setIsSearched={setIsSearched}
      homeboardModalImg={img}
      setHomeboardImg={setImg}
      setHomeboardModalImg={setImg}
      updateHomeboardImg={async () => "hi"}
      bookmarkDatas={[
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
      ]}
      onClickBookmarkDel={async () => console.log("hi")}
      onClickBookmarkSave={async () => console.log("hi")}
      setIsError={setToastMsg}
      setIsSuccess={setToastMsg}
    />
  );
};

export const homeboard = Template.bind({});

export const homeboardWithBackground = Template.bind({});
homeboardWithBackground.args = {
  homeboardImg: "/theme_img/img_1.jpg",
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
