interface directoryInfoType {
  emoji?: string | null;
  id: number;
  name: string;
}
export interface CookieDataProps {
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
