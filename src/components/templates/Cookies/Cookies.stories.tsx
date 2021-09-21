import { Meta, Story } from "@storybook/react";
import Cookies, { CookiesProps } from ".";

export default {
  title: "components/templates/Cookies",
  component: Cookies,
} as Meta;

const Template: Story<CookiesProps> = (args) => {
  return <Cookies {...args} />;
};

const data = [
  {
    content: "",
    directoryInfo: {
      emoji: "❤",
      id: 1367,
      name: "playlist🎧",
    },
    favicon: "https://www.youtube.com/s/desktop/cb471591/img/favicon_32x32.png",
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
    favicon: "https://www.youtube.com/s/desktop/cb471591/img/favicon_32x32.png",
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
    favicon: "https://www.youtube.com/s/desktop/cb471591/img/favicon_32x32.png",
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
    favicon: "https://www.youtube.com/s/desktop/cb471591/img/favicon_32x32.png",
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
];

export const Default = Template.bind({});
Default.args = {
  data,
};

export const empty = Template.bind({});
empty.args = {
  data: [],
  type: "normal",
};

export const searchEmpty = Template.bind({});
searchEmpty.args = {
  data: [],
  type: "searched",
};

export const dirDetailEmpty = Template.bind({});
dirDetailEmpty.args = {
  data: [],
  type: "dirDetail",
};

export const SharedCookies = Template.bind({});
SharedCookies.args = {
  data,
  type: "dirShare",
};
