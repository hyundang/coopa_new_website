// apis
import { getApi, putApi } from "@api/index";
// interfaces
import { UpdateUserProps, UserDataProps } from "@interfaces/user";
// libs
import { useState } from "react";
import useSWR from "swr";
import cookie from "react-cookies";
import { NextRouter } from "next/router";

interface UserModuleProps {
  initUserData: UserDataProps;
  router: NextRouter;
}
const UserModule = ({ initUserData, router }: UserModuleProps) => {
  const filter: string =
    "win16|win32|win64|wince|mac|macintel|macppc|mac68k|linux i686|linux armv7l|hp-ux|sunos";
  const [isPC, setIsPC] = useState<boolean>(true);

  // 유저 데이터
  const {
    data: userData,
    error: userDataError,
    mutate,
  } = useSWR("/users", getApi.getUserData, {
    initialData: initUserData,
    errorRetryCount: 3,
  });
  // 프로필 수정 데이터
  const [profileData, setProfileData] = useState<UpdateUserProps>({
    name: "",
    introduction: "",
  });

  const handleLogout = () => {
    cookie.remove("x-access-token");
    if (isPC) {
      chrome.runtime.sendMessage(
        EXTENSION_ID,
        { isLogin: false },
        (res: any) => {
          if (!res.success) alert("로그아웃 실패!");
        },
      );
    }
    router.replace("/login");
  };

  const updateProfile = async () => {
    const res = await putApi.putUserData(profileData);
    if (res) {
      mutate(() => {
        return {
          ...initUserData,
          name: profileData.name,
          introduction: profileData.introduction,
        };
      }, false);
      return;
    }
    alert("프로필 수정 실패!");
  };

  return {
    userData,
    profileData,
    setProfileData,
    handleLogout,
    updateProfile,
  };
};

export default UserModule;
