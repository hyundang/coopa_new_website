export interface UserData {
  email: string;
  profileImage?: string | null;
  introduction?: string;
  allCookies: number;
  readCount: number;
}

interface directoryInfoType {
  emoji?: string | null;
  id: number;
  name: string;
}
export interface CookieData {
  content: string;
  directoryInfo?: directoryInfoType;
  favicon: string;
  id: number;
  link: string;
  provider: string;
  readCnt: number;
  thumbnail: string;
  title: string;
}

export interface DirectoryData {
  emoji: string;
  id: number;
  name: string;
  thumbnail: string;
  cookieCnt: number;
}
