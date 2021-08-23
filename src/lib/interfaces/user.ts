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
  email: string;
  googleId: string;
  profileImage: string;
}

export interface EditUserDataProps {
  name: string;
  introduction?: string;
}
