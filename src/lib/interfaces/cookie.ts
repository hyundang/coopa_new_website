export interface directoryInfoType {
  emoji?: string | null;
  id: number;
  name: string;
}
export interface CookieDataProps {
  content: string;
  directoryInfo: directoryInfoType | null;
  favicon: string;
  id: number;
  link: string;
  provider: string;
  readCnt: number;
  thumbnail: string;
  title: string;
  isPinned: boolean;
}
export interface CookieDeleteDataProps {
  content: string;
  cookieId: number;
  deleted: boolean;
  favicon: string;
  link: string;
  provider: string;
  thumbnail: string;
  title: string;
}

/** 쿠키 추가 */
export interface PostCookieProps {
  content: string;
  favicon: string;
  link: string;
  provider: string;
  thumbnail: string;
  title: string;
}

/** 쿠키 수정 */
export interface PatchCookieProps {
  title: string;
  content: string;
  thumbnail: string;
  cookieId: number;
  image?: File;
}
