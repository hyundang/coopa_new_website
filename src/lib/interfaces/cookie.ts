interface directoryInfoType {
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
}
/** 쿠키 수정 */
export interface PatchCookieProps {
  title: string;
  content: string;
  thumbnail: string;
  cookieId: number | string;
  image?: File;
}
