export interface GetAllDirProps {
  common: DirDataProps[];
  pinned?: DirDataProps[];
}

export interface DirDataProps {
  emoji?: string;
  id: number;
  name: string;
  thumbnail?: string;
  cookieCnt: number;
  isPinned: boolean;
}

export interface CreateDirProps {
  name: string;
  emoji?: string;
}

export interface CreateDirectoryResProps {
  directoryId: number;
  name: string;
  emoji: string;
}

export interface DeleteDirProps {
  directoryId: number;
  name: string;
}

export interface CreateCookieToDirProps {
  directoryId: number;
  cookieId: number;
}

export interface CreateCookieToDirResProps {
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

export interface CreateReadCntResProps {
  content: string;
  cookieId: number;
  readCnt: number;
  title: string;
  link: string;
  thumbnail: string;
  favicon: string;
  provider: string;
}
