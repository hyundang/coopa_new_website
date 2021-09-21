import { Meta, Story } from "@storybook/react";
import DirDetail, { DirDetailProps } from ".";

export default {
  title: "components/templates/DirDetail",
  component: DirDetail,
} as Meta;

const Template: Story<DirDetailProps> = (args) => <DirDetail {...args} />;

// mock data
const dirInfo = {
  name: "playlist",
  id: 1,
  emoji: "💜",
};
const cookies = [
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
    favicon: "https://www.youtube.com/s/desktop/cb471591/img/favicon_32x32.png",
    id: 11973,
    link: "https://www.youtube.com/watch?v=C7sLwDOL1Vo",
    provider: "YouTube",
    readCnt: 1,
    thumbnail: "https://i.ytimg.com/vi/C7sLwDOL1Vo/hqdefault.jpg",
    title:
      "[playlist]봄 밤, 창이 열린 1층 카페 끝 자리, 가사 없는 chilling 음악",
  },
];

export const dirDetail = Template.bind({});
dirDetail.args = {
  nickname: "희수 친구 채린",
  imgUrl:
    "https://lh4.googleusercontent.com/-8Sj3uh-4Tvc/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucm1v42OfrKMBeMcncTbD27GToGVqA/s96-c/photo.jpg",
  cookies,
};

export const dirDetailEmpty = Template.bind({});
dirDetailEmpty.args = {
  nickname: "희수 친구 채린",
  imgUrl:
    "https://lh4.googleusercontent.com/-8Sj3uh-4Tvc/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucm1v42OfrKMBeMcncTbD27GToGVqA/s96-c/photo.jpg",
  cookies: [],
};

export const dirShare = Template.bind({});
dirShare.args = {
  isShared: true,
  nickname: "희수 친구 채린",
  imgUrl:
    "https://lh4.googleusercontent.com/-8Sj3uh-4Tvc/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucm1v42OfrKMBeMcncTbD27GToGVqA/s96-c/photo.jpg",
  cookies,
};
