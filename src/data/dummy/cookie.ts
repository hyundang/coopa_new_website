import { CookieDataProps } from "@interfaces/cookie";
import CookieModule from "@modules/CookieModule";

export const cookies: CookieDataProps[] = [
  {
    id: 995,
    link: "https://www.youtube.com/watch?v=VCSsU12ilKo&list=PLC3C6uK1flJ0Mubn3juk6rNpvSSrU3fr7&index=11",
    title: "[Playlist] 듣는 순간 하트시그널 출연자로 기억조작 눈누",
    content:
      "photo : Sevilla, Spain (2016)Camera : Nikon D5300☑️ 이 채널에 쓰이는 사진은 모두 제가 직접 촬영했습니다.☑️ 음악에 대한 저작권 소유자가 아니므로 영상 및 광고를 통해 수익창출을 하지 않습니다.☑️ 유튜브 저작권 규정에 따라 광고가 발생 ...",
    provider: "YouTube",
    favicon: "https://www.youtube.com/s/desktop/a466a8fe/img/favicon_32x32.png",
    thumbnail: "https://i.ytimg.com/vi/VCSsU12ilKo/maxresdefault.jpg",
    readCnt: 0,
    isPinned: false,
    directoryInfo: { id: 724, name: "나는 채린", emoji: "\uD83D\uDE00" },
  },
  {
    id: 993,
    link: "https://www.youtube.com/watch?v=zLGORwnRyDo",
    title:
      "차가운 계절, 우리는 함께 브라운아이드소울 노래를 꺼내들었다 (Part.1)",
    content: "브라운아이드소울의 사랑노래 Part.1Phot",
    provider: "YouTube",
    favicon: "https://www.youtube.com/s/desktop/a466a8fe/img/favicon_32x32.png",
    thumbnail: "https://i.ytimg.com/vi/zLGORwnRyDo/maxresdefault.jpg",
    readCnt: 11,
    isPinned: false,
    directoryInfo: { id: 720, name: "ㅎㅇㅎㅇ", emoji: null },
  },
  {
    id: 997,
    link: "https://www.youtube.com/watch?v=8_p8VoHF2NE&t=1547s",
    title: "[Playlist] 내가 사랑한 류이치사카모토의 음악",
    content: "진짜 화낸다 얌",
    provider: "YouTube",
    favicon: "https://www.youtube.com/s/desktop/a466a8fe/img/favicon_32x32.png",
    thumbnail: "https://i.ytimg.com/vi/8_p8VoHF2NE/hqdefault.jpg",
    readCnt: 1,
    isPinned: false,
    directoryInfo: { id: 720, name: "ㅎㅇㅎㅇ", emoji: null },
  },
  {
    id: 994,
    link: "https://www.youtube.com/watch?v=Plqq2snbG9c",
    title: "비행기는 안 탔지만 월드투어 중",
    content: "#Playlist #Travel#코딩좋은",
    provider: "YouTube",
    favicon: "https://www.youtube.com/s/desktop/a466a8fe/img/favicon_32x32.png",
    thumbnail: "https://i.ytimg.com/vi/Plqq2snbG9c/maxresdefault.jpg",
    readCnt: 4,
    isPinned: false,
    directoryInfo: { id: 769, name: "안녕", emoji: null },
  },
  {
    id: 996,
    link: "https://www.youtube.com/watch?v=woAHwpOLmyY",
    title: "Kimi no Na wa (Your Name) Soundtrack - Main Theme",
    content:
      "Kimi no Na wa (Your Name) Soundtrack - 4 Main Theme in the Film - RADWIMPS==========Tracklist========== 0:00 Dream Lantern (Original Version)2:09 Zenzenzense...",
    provider: "YouTube",
    favicon: "https://www.youtube.com/s/desktop/a466a8fe/img/favicon_32x32.png",
    thumbnail: "https://i.ytimg.com/vi/woAHwpOLmyY/maxresdefault.jpg",
    readCnt: 0,
    isPinned: false,
    directoryInfo: { id: 650, name: "테스또", emoji: "\uD83D\uDE03" },
  },
  {
    id: 999,
    link: "https://www.youtube.com/watch?v=Kg-mW8SyNVg",
    title: "Our Times《我的少女时代》电影主題曲 -《小幸运》MV by 田馥甄",
    content:
      "Check out this official music video on the theme song for OUR TIMES - A little happiness by artist Hebe Tien.We all had to live through and rise above the aw...",
    provider: "YouTube",
    favicon: "https://www.youtube.com/s/desktop/a466a8fe/img/favicon_32x32.png",
    thumbnail: "https://i.ytimg.com/vi/Kg-mW8SyNVg/maxresdefault.jpg",
    readCnt: 0,
    isPinned: false,
    directoryInfo: { id: 720, name: "ㅎㅇㅎㅇ", emoji: null },
  },
];

export const cookie = {
  id: 999,
  link: "https://www.youtube.com/watch?v=Kg-mW8SyNVg",
  title: "Our Times《我的少女时代》电影主題曲 -《小幸运》MV by 田馥甄",
  content:
    "Check out this official music video on the theme song for OUR TIMES - A little happiness by artist Hebe Tien.We all had to live through and rise above the aw...",
  provider: "YouTube",
  favicon: "https://www.youtube.com/s/desktop/a466a8fe/img/favicon_32x32.png",
  thumbnail: "https://i.ytimg.com/vi/Kg-mW8SyNVg/maxresdefault.jpg",
  readCnt: 0,
  isPinned: false,
  directoryInfo: { id: 720, name: "ㅎㅇㅎㅇ", emoji: null },
};

export const mockCookieModule: ReturnType<typeof CookieModule> = {
  isError: false,
  isLoading: false,
  cookieFilter: "latest",
  updateAndSaveCookieFilter: () => {},
  pinnedCookieData: [],
  unpinnedCookieData: [],
  unpinnedPageIndex: 0,
  setUnpinnedPageIndex: async () => undefined,
  searchedCookieData: [],
  copyCookieLink: () => {},
  createCookie: async () => false,
  deleteCookie: async () => {},
  updateCookie: async () => {},
  isUpdateLoading: false,
  setIsUpdateLoading: () => {},
  updateDirOfCookie: async () => undefined,
  updateCookieReadCnt: async () => {},
  updateCookiePin: async () => false,
  refreshCookie: async () => {},
};
