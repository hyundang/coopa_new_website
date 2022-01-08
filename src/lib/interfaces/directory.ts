export interface GetDirectoryDataProps {
  common: DirectoryDataProps[];
  pinned?: DirectoryDataProps[];
}

export interface DirectoryDataProps {
  emoji?: string;
  id: number;
  name: string;
  thumbnail?: string;
  cookieCnt: number;
  isPinned: boolean;
}

export interface PostDirectoryProps {
  name: string;
  emoji?: string;
}

export interface PostDirectoryResponseProps {
  directoryId: number;
  name: string;
  emoji: string;
}

export interface DirDeleteDataProps {
  directoryId: number;
  name: string;
}

export interface PostCookieToDirProps {
  directoryId: number;
  cookieId: number;
}

export interface PostCookieToDirResponseProps {
  content: string;
  cookieId: number;
  directoryId: number;
  directoryName: string;
  directoryEmoji: string | null;
  title: string;
  link: string;
  thumbnail: string;
  favicon: string;
  provider: string;
}

export interface PostReadCntResponseProps {
  content: string;
  cookieId: number;
  readCnt: number;
  title: string;
  link: string;
  thumbnail: string;
  favicon: string;
  provider: string;
}
