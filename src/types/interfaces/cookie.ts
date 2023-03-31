import { SimpleDirDataProps } from "./directory";

interface EditableCookieInfoProps {
  title: string;
  content: string;
  thumbnail: string;
}

interface CookieInfoProps extends EditableCookieInfoProps {
  favicon: string;
  link: string;
  provider: string;
}

export interface CookieDataProps extends CookieInfoProps {
  id: number;
  directoryInfo: SimpleDirDataProps | null;
  readCnt: number;
  isPinned: boolean;
}

export interface DeleteCookieProps extends CookieInfoProps {
  cookieId: number;
  deleted: boolean;
}

/** 쿠키 추가 */
export interface CreateCookieProps extends CookieInfoProps {}

/** 쿠키 수정 */
export interface UpdateCookieProps extends EditableCookieInfoProps {
  cookieId: number;
  image?: File;
}

export interface CreateCookieToDirResProps extends CookieInfoProps {
  cookieId: number;
  directoryId: number;
  directoryName: string;
  directoryEmoji: string | null;
}

export interface CreateReadCntResProps extends CookieInfoProps {
  cookieId: number;
  readCnt: number;
}
