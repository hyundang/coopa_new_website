export interface UserDataProps {
  name: string;
  email: string;
  profileImage?: string;
  introduction?: string;
  allCookies: number;
  readCount: number;
}

export interface PostUserDataProps {
  name: string;
  introduction?: string;
}
