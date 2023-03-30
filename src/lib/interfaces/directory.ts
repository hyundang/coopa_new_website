interface DirInfoProps {
  name: string;
  emoji?: string | null;
}

export interface GetAllDirProps {
  common: DirDataProps[];
  pinned?: DirDataProps[];
}

export interface DirDataProps extends DirInfoProps {
  id: number;
  thumbnail?: string;
  cookieCnt: number;
  isPinned: boolean;
}

export interface SimpleDirDataProps extends DirInfoProps {
  id: number;
  cookieCount?: number;
}

export interface CreateDirProps extends DirInfoProps {}

export interface CreateDirectoryResProps extends DirInfoProps {
  directoryId: number;
}

export interface DeleteDirProps {
  directoryId: number;
  name: string;
}

export interface CreateCookieToDirProps {
  directoryId: number;
  cookieId: number;
}
