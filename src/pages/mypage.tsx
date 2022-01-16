import { getApi, putApi } from "@lib/api";
import { My } from "@components/templates";
import useSWR, { mutate } from "swr";
import { UpdateUserProps, UserDataProps } from "@interfaces/user";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import cookie from "react-cookies";

export default function mypage({
  initUserData,
}: {
  initUserData: UserDataProps;
}) {
  const router = useRouter();
  // 유저 데이터
  const { data: userData, error: userDataError } = useSWR<
    UserDataProps | undefined
  >("/users", getApi.getUserData, {
    initialData: initUserData,
    onErrorRetry: ({ retryCount }) => {
      console.log(userDataError);
      // 3번 까지만 재시도함
      if (retryCount >= 3) return undefined;
      return true;
    },
  });
  // 프로필 수정 데이터
  const [profileData, setProfileData] = useState<UpdateUserProps>({
    name: "",
    introduction: "",
  });
  // 프로필 수정 모달 오픈
  const [isOpen, setIsOpen] = useState(false);

  const handleClickLogout = () => {
    cookie.remove("x-access-token");
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

// export const getStaticProps: GetStaticProps = async () => {
//   const initUserData = await getApi.getUserData("/users");
//   return { props: { initUserData } };
// };
