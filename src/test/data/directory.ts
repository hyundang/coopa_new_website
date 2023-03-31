import {
  GetAllDirProps,
  DirDataProps,
  SimpleDirDataProps,
  SharedDirDetailDataProps,
} from "@interfaces/directory";
import DirModule from "@modules/DirModule";

export const directories: GetAllDirProps = {
  pinned: [
    {
      id: 1091,
      isPinned: true,
      name: "코테",
      thumbnail:
        "https://d1b64e2bmdcy95.cloudfront.net/cookie/2023-02-04-11:07:59-user4.jpg",
      cookieCnt: 7,
    },
    { id: 5539, isPinned: true, name: "ssafy", thumbnail: "", cookieCnt: 3 },
    {
      id: 5617,
      isPinned: true,
      name: "cs",
      thumbnail:
        "https://velog.velcdn.com/images/sicksong/post/51235540-c553-430d-9613-fa57b67ba48e/CS.png",
      cookieCnt: 5,
    },
  ],
  common: [
    {
      id: 2159,
      isPinned: false,
      name: "aws",
      thumbnail:
        "https://d1b64e2bmdcy95.cloudfront.net/cookie/2022-03-05-21:16:47-user4.jpeg",
      emoji: "⚒️",
      cookieCnt: 8,
    },
    {
      id: 2162,
      isPinned: false,
      name: "aws 자격증",
      thumbnail:
        "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FBZxbG%2FbtqPm92G3ve%2F5WeEOzqOXfKpur70mH2kc0%2Fimg.png",
      emoji: "\uD83D\uDC39",
      cookieCnt: 3,
    },
    {
      id: 389,
      isPinned: false,
      name: "axios->utf8",
      thumbnail:
        "https://coopa-default.s3.ap-northeast-2.amazonaws.com/default_thumbnail.png",
      cookieCnt: 4,
    },
    {
      id: 5618,
      isPinned: false,
      name: "javascript",
      thumbnail:
        "https://jeonghwan-kim.github.io/static/820880b6ab2304ffa6c20b3f91039f0e/630fb/functional-javascript-thumbnail.png",
      cookieCnt: 4,
    },
    { id: 140, isPinned: false, name: "next.js", thumbnail: "", cookieCnt: 5 },
    { id: 1351, isPinned: false, name: "react", thumbnail: "", cookieCnt: 13 },
    {
      id: 2664,
      isPinned: false,
      name: "sql",
      thumbnail: "",
      emoji: "\uD83D\uDD87️",
      cookieCnt: 8,
    },
    {
      id: 234,
      isPinned: false,
      name: "styled-components",
      thumbnail:
        "http://flamingotiger.github.io/image/thumb/styled-components-thumb.jpg",
      cookieCnt: 3,
    },
    {
      id: 141,
      isPinned: false,
      name: "typescript",
      thumbnail:
        "https://media.vlpt.us/post-images/zeros0623/9ef11850-31df-11ea-a94f-ab0e05c4904a/TypeScriptImage.jpeg?w=768",
      cookieCnt: 7,
    },
    {
      id: 207,
      isPinned: false,
      name: "서버",
      thumbnail: "https://images.velog.io/velog.png",
      emoji: "\uD83C\uDF89",
      cookieCnt: 15,
    },
    {
      id: 4763,
      isPinned: false,
      name: "영어",
      thumbnail:
        "https://blogpfthumb-phinf.pstatic.net/20210124_285/wasabi777_1611496696878441lX_JPEG/image.jpg?type=f204_204",
      cookieCnt: 2,
    },
    {
      id: 4367,
      isPinned: false,
      name: "조립컴",
      thumbnail:
        "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F1XnX9%2FbtqN8Y0RNES%2F1BnqFTIKMJx64nSLKhK7ZK%2Fimg.jpg",
      cookieCnt: 3,
    },
    {
      id: 4648,
      isPinned: false,
      name: "폴웨어",
      thumbnail: "",
      emoji: "\uD83D\uDC57",
      cookieCnt: 2,
    },
    {
      id: 1671,
      isPinned: false,
      name: "프론트 최적화",
      thumbnail:
        "https://velog.velcdn.com/post-images/velopert/65d87b10-c356-11e8-a7e2-57af7a25e2db/code-splitting.png",
      emoji: "\uD83D\uDDA5️",
      cookieCnt: 9,
    },
  ],
};

export const searchedDirectories: DirDataProps[] = [
  {
    id: 5618,
    isPinned: false,
    name: "javascript",
    thumbnail:
      "https://jeonghwan-kim.github.io/static/820880b6ab2304ffa6c20b3f91039f0e/630fb/functional-javascript-thumbnail.png",
    cookieCnt: 4,
  },
  { id: 140, isPinned: false, name: "next.js", thumbnail: "", cookieCnt: 5 },
];

export const directoryInfo: SimpleDirDataProps = {
  id: 1091,
  name: "코테",
  cookieCount: 7,
};

export const sharedDirectory: SharedDirDetailDataProps = {
  directoryInfo,
  userInfo: {
    name: "Hyunjin Lee",
    profileImage:
      "https://lh5.googleusercontent.com/-iKH4kcTU298/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnofwea1DKUZyF7cjUeO12bCL9LpA/s96-c/photo.jpg",
  },
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
