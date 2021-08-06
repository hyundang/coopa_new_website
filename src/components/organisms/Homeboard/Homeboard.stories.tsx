import { Story, Meta } from "@storybook/react";
import { useState } from "react";
import Homeboard, { HomeboardProps } from ".";

export default {
  title: "components/organisms/Homeboard",
  component: Homeboard,
} as Meta;

const Template: Story<HomeboardProps> = (args) => <Homeboard {...args} />;

export const homeboard = Template.bind({});
homeboard.args = {
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

// export const homeboard = () => {
//   const [visible, setVisible] = useState(false);
//   const [isSearched, setIsSearched] = useState(false);
//   const [img, setImg] = useState("");
//   return (
//     <Homeboard
//       visible={visible}
//       setVisible={setVisible}
//       isSearched={isSearched}
//       setIsSearched={setIsSearched}
//       homeboardModalImg={img}
//       setHomeboardImg={setImg}
//       setHomeboardModalImg={setImg}
//       postHomeboardImg={() => "hi"}
//       bookmarkDatas={[
//         {
//           id: 1,
//           name: "naver",
//           link: "https://www.naver.com",
//           image: "	https://papago.naver.com/favicon.ico",
//         },
//         {
//           id: 2,
//           name: "naver",
//           link: "https://www.naver.com",
//           image: "	https://papago.naver.com/favicon.ico",
//         },
//         {
//           id: 3,
//           name: "naver",
//           link: "https://www.naver.com",
//           image: "	https://papago.naver.com/favicon.ico",
//         },
//       ]}
//       onClickBookmarkDel={() => console.log("hi")}
//       onClickBookmarkSave={() => console.log("hi")}
//     />
//   );
// };
