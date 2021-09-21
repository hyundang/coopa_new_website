export interface DirectoryDataProps {
  emoji?: string;
  id: number;
  name: string;
  thumbnail?: string;
  cookieCnt: number;
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
  id: number;
  name: string;
}

export interface PostAddCookieToDirProps {
  directoryId: number;
  cookieId: number;
}

export interface PostDirAddCookieResponseProps {
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
