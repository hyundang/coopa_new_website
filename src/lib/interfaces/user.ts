interface EditableUserInfoProps {
  name: string;
  introduction?: string;
}

export interface UserDataProps extends EditableUserInfoProps {
  id: number;
  email: string;
  profileImage?: string;
  cookieCount: number;
  readCookieCnt: number;
}

export interface CreateUserProps {
  name: string;
  email: string;
  googleId: string;
  profileImage: string;
}

export interface UpdateUserProps extends EditableUserInfoProps {}
