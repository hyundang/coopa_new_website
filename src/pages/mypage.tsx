import { getApi, putApi } from "@lib/api";
import { My } from "@components/templates";
import useSWR, { mutate } from "swr";
import { EditUserDataProps, UserDataProps } from "@interfaces/user";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";

export default function mypage() {
  const router = useRouter();
  // 유저 데이터 get
  const { data: userData, error: userDataError } = useSWR<
    UserDataProps | undefined
  >("/users", getApi.getUserData, {
    onErrorRetry: ({ retryCount }) => {
      console.log(userDataError);
      // 3번 까지만 재시도함
      if (retryCount >= 3) return undefined;
      return true;
    },
  });
  // 프로필 수정 데이터
  const [profileData, setProfileData] = useState<EditUserDataProps>({
    name: "",
    introduction: "",
  });
  // 프로필 수정 모달 오픈
  const [isOpen, setIsOpen] = useState(false);

  const handleClickLogout = () => {
    localStorage.removeItem("x-access-token");
    router.replace("/login");
  };

  const handleEditProfile = async () => {
    mutate(
      "/users",
      {
        ...userData,
        ...profileData,
      },
      false,
    );
    await putApi.putUserData(profileData);
  };

  useEffect(() => {
    localStorage.getItem("x-access-token") === null && router.replace("/login");
  }, []);

  useEffect(() => {
    isOpen &&
      setProfileData({
        name: userData?.name || "",
        introduction: userData?.introduction,
      });
  }, [isOpen]);

  return (
    <>
      {userData ? (
        <My
          userData={userData}
          onClickLogout={handleClickLogout}
          editProfile={handleEditProfile}
          profileData={profileData}
          setProfileData={setProfileData}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      ) : (
        <div>로딩뷰</div>
      )}
    </>
  );
}
