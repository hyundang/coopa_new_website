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
}
/** 쿠키 수정 */
export interface PatchCookieProps {
  title: string;
  content: string;
  thumbnail: string;
  cookieId: number | string;
  image?: File;
}

/** 디렉토리 쿠키 */
export interface DirectoryCookieDataProps {
  directoryInfo: directoryInfoType;
  cookies: CookieDataProps[];
}

/** 공유 디렉토리 쿠키 */
export interface SharedDirectoryCookieDataProps {
  directoryInfo: directoryInfoType;
  cookies: CookieDataProps[];
  userInfo: {
    name: string;
    profileImage: string;
  };
}
