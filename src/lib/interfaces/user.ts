export interface UserDataProps {
  id: number;
  name: string;
  email: string;
  profileImage?: string;
  introduction?: string;
  cookieCount: number;
  readCookieCnt: number;
}

export interface PostUserDataProps {
  name: string;
  email: string;
  googleId: string;
  profileImage: string;
}

export interface EditUserDataProps {
  name: string;
  introduction?: string;
}
