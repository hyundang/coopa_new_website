import { Meta, Story } from "@storybook/react";
import Cookie, { CookieProps } from ".";

export default {
  title: "components/organisms/Cookie",
  component: Cookie,
} as Meta;

export const cookie270: Story<CookieProps> = (args) => {
  const cookie = {
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
  };
  return (
    <div style={{ width: "270px" }}>
      <Cookie {...args} cookie={cookie} allDir={allDir} />
    </div>
  );
};

export const cookie270NoContent: Story<CookieProps> = (args) => {
  const cookie = {
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
    thumbnail: "https://i.ytimg.com/vi/C7sLwDOL1Vo/hqdefault.jpg",
    title:
      "[playlist]봄 밤, 창이 열린 1층 카페 끝 자리, 가사 없는 chilling 음악",
  };
  return (
    <div style={{ width: "270px" }}>
      <Cookie {...args} cookie={cookie} allDir={allDir} />
    </div>
  );
};

export const cookie300: Story<CookieProps> = (args) => {
  const cookie = {
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
  };
  return (
    <div style={{ width: "300px" }}>
      <Cookie {...args} cookie={cookie} allDir={allDir} />
    </div>
  );
};

//mockData

const allDir = [
  {
    emoji: "😀",
    id: 2543,
    name: "3ps",
    thumbnail: "https://www.notion.so/images/meta/default.png",
    cookieCnt: 1,
  },
];
