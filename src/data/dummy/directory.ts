import DirModule from "@modules/DirModule";

export const directories = {
  common: [
    { id: 770, isPinned: false, name: "최고", cookieCnt: 0 },
    {
      id: 769,
      isPinned: false,
      name: "안녕",
      thumbnail: "https://i.ytimg.com/vi/Plqq2snbG9c/maxresdefault.jpg",
      cookieCnt: 1,
    },
    {
      id: 643,
      isPinned: false,
      name: "힘들다",
      emoji: "\uD83D\uDE02",
      cookieCnt: 0,
    },
    {
      id: 724,
      isPinned: false,
      name: "나는 채린",
      thumbnail: "https://i.ytimg.com/vi/VCSsU12ilKo/maxresdefault.jpg",
      emoji: "\uD83D\uDE00",
      cookieCnt: 1,
    },
    {
      id: 720,
      isPinned: false,
      name: "ㅎㅇㅎㅇ",
      thumbnail: "https://i.ytimg.com/vi/zLGORwnRyDo/maxresdefault.jpg",
      cookieCnt: 3,
    },
    {
      id: 644,
      isPinned: false,
      name: "나는 NEW!",
      emoji: "✨",
      cookieCnt: 0,
    },
    {
      id: 650,
      isPinned: false,
      name: "테스또",
      thumbnail: "https://i.ytimg.com/vi/woAHwpOLmyY/maxresdefault.jpg",
      emoji: "\uD83D\uDE03",
      cookieCnt: 1,
    },
    {
      id: 628,
      isPinned: false,
      name: "몇자리까지가능해애애애애애애애애애애애",
      emoji: "\uD83C\uDF54",
      cookieCnt: 0,
    },
    {
      id: 621,
      isPinned: false,
      name: "최대열세자리리리",
      emoji: "\uD83D\uDE0D",
      cookieCnt: 0,
    },
    {
      id: 492,
      isPinned: false,
      name: "마추픽추에비츄",
      emoji: "\uD83D\uDE3A",
      cookieCnt: 0,
    },
  ],
  pinned: [
    {
      id: 746,
      isPinned: true,
      name: "최대열세자리리리리리리리리리리리",
      cookieCnt: 0,
    },
    { id: 742, isPinned: true, name: "535352", emoji: "", cookieCnt: 0 },
  ],
};

export const mockDirModule: ReturnType<typeof DirModule> = {
  isError: false,
  isLoading: false,
  dirFilter: "latest",
  updateAndSaveDirFilter: () => {},
  pinnedDirData: [],
  unpinnedDirData: [],
  searchedDirData: [],
  createDir: async () => -1,
  deleteDir: async () => {},
  updateDir: async () => {},
  updateDirPin: async () => {},
  refreshDir: async () => {},
};
