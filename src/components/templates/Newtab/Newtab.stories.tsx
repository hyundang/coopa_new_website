import { Story, Meta } from "@storybook/react";
import { useState } from "react";
import Newtab, { NewtablProps } from ".";

export default {
  title: "components/templates/Newtab",
  component: Newtab,
} as Meta;

const Template: Story<NewtablProps> = (args) => {
  const [isVisible, setIsVisible] = useState({
    dirCreate: false,
    dirDel: false,
    dirEdit: false,
    cookieDel: false,
    cookieEdit: false,
    bookmarkDel: false,
    bookmarkCreate: false,
    homeboardEdit: false,
    imgSizeOver: false,
  });
  return (
    <Newtab
      {...args}
      isToastMsgVisible={isVisible}
      setIsToastMsgVisible={setIsVisible}
      imgUrl="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
    />
  );
};

export const emptyBookmark = Template.bind({});
emptyBookmark.args = {
  bookmarkDatas: [],
  cookieData: [],
  dirData: [],
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
  cookieData: [],
  dirData: [],
};

export const newtab = Template.bind({});
newtab.args = {
  bookmarkDatas: [],
  cookieFilter: "latest",
  dirFilter: "latest",
  cookieData: [
    {
      content: "",
      directoryInfo: {
        emoji: "❤",
        id: 1367,
        name: "playlist🎧",
      },
      favicon:
        "https://www.youtube.com/s/desktop/cb471591/img/favicon_32x32.png",
      id: 11973,
      link: "https://www.youtube.com/watch?v=C7sLwDOL1Vo",
      provider: "YouTube",
      readCnt: 1,
      thumbnail: "https://i.ytimg.com/vi/PQF3CXqXbfY/maxresdefault.jpg",
      title: "[playlist]봄 밤, 창이 열린 1층 카페",
    },
    {
      content: "",
      directoryInfo: {
        emoji: null,
        id: 1367,
        name: "playlist🎧",
      },
      favicon:
        "https://www.youtube.com/s/desktop/cb471591/img/favicon_32x32.png",
      id: 11973,
      link: "https://www.youtube.com/watch?v=C7sLwDOL1Vo",
      provider: "YouTube",
      readCnt: 1,
      thumbnail: "",
      title:
        "[playlist]봄 밤, 창이 열린 1층 카페 끝 자리, 가사 없는 chilling 음악",
    },
    {
      content:
        "이번 플리는 오래전부터 좋아했던 아티스트 'Justice Der'의 기타 커버곡으로 이루어져 있습니다. 음악을 듣다 보면 한번쯤은 들어보셨을 만한 유명한 팝송 위주로 선곡했습니다. 봄밤과 어울리는 은은한 분위기의 jazzy한 기타 커버곡 플레이리스트 좋아하셨으면 좋겠네요 :)+ 아...",
      directoryInfo: {
        emoji: null,
        id: 1367,
        name: "playlist🎧",
      },
      favicon:
        "https://www.youtube.com/s/desktop/cb471591/img/favicon_32x32.png",
      id: 11973,
      link: "https://www.youtube.com/watch?v=C7sLwDOL1Vo",
      provider: "YouTube",
      readCnt: 1,
      thumbnail: "https://i.ytimg.com/vi/C7sLwDOL1Vo/hqdefault.jpg",
      title: "[playlist]봄 밤, 창이 열린 1층 카페",
    },
    {
      content:
        "이번 플리는 오래전부터 좋아했던 아티스트 'Justice Der'의 기타 커버곡으로 이루어져 있습니다. 음악을 듣다 보면 한번쯤은 들어보셨을 만한 유명한 팝송 위주로 선곡했습니다. 봄밤과 어울리는 은은한 분위기의 jazzy한 기타 커버곡 플레이리스트 좋아하셨으면 좋겠네요 :)+ 아...",
      directoryInfo: {
        emoji: null,
        id: 1367,
        name: "playlist🎧",
      },
      favicon:
        "https://www.youtube.com/s/desktop/cb471591/img/favicon_32x32.png",
      id: 11973,
      link: "https://www.youtube.com/watch?v=C7sLwDOL1Vo",
      provider: "YouTube",
      readCnt: 1,
      thumbnail: "https://i.ytimg.com/vi/C7sLwDOL1Vo/hqdefault.jpg",
      title:
        "[playlist]봄 밤, 창이 열린 1층 카페 끝 자리, 가사 없는 chilling 음악",
    },
    {
      content:
        "이번 플리는 오래전부터 좋아했던 아티스트 'Justice Der'의 기타 커버곡으로 이루어져 있습니다. 음악을 듣다 보면 한번쯤은 들어보셨을 만한 유명한 팝송 위주로 선곡했습니다. 봄밤과 어울리는 은은한 분위기의 jazzy한 기타 커버곡 플레이리스트 좋아하셨으면 좋겠네요 :)+ 아...",
      directoryInfo: {
        emoji: null,
        id: 1367,
        name: "playlist🎧",
      },
      favicon: "",
      id: 11973,
      link: "https://www.youtube.com/watch?v=C7sLwDOL1Vo",
      provider: "YouTube",
      readCnt: 1,
      thumbnail: "",
      title:
        "[playlist]봄 밤, 창이 열린 1층 카페 끝 자리, 가사 없는 chilling 음악",
    },
  ],
  dirData: [
    {
      emoji: "😀",
      id: 2543,
      name: "3ps1",
      thumbnail: "https://www.notion.so/images/meta/default.png",
      cookieCnt: 1,
    },
    {
      emoji: "",
      id: 2543,
      name: "3ps2",
      thumbnail: "https://www.notion.so/images/meta/default.png",
      cookieCnt: 1,
    },
    {
      emoji: "😀",
      id: 2543,
      name: "3ps3",
      thumbnail: "https://www.notion.so/images/meta/default.png",
      cookieCnt: 1,
    },
    {
      emoji: "😀",
      id: 2543,
      name: "3ps4",
      thumbnail: "https://www.notion.so/images/meta/default.png",
      cookieCnt: 1,
    },
  ],
};
