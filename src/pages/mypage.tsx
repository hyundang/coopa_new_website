// apis
import { getApi } from "@api/index";
// components
import { My } from "@components/templates";
// interfaces
import { UserDataProps } from "@interfaces/user";
// libs
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import nextCookie from "next-cookies";
import { setToken } from "@lib/TokenManager";
// modules
import UserModule from "@modules/UserModule";

export default function mypage({
  initUserData,
}: {
  initUserData: UserDataProps;
}) {
  const router = useRouter();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const userModule = UserModule({
    initUserData,
    router,
  });

  const initalizeProfileData = () => {
    userModule.setProfileData({
      name: userModule.userData?.name || "",
      introduction: userModule.userData?.introduction,
    });
  };

  useEffect(() => {
    isUpdateModalOpen && initalizeProfileData();
  }, [isUpdateModalOpen]);

  return (
    <>
      {userModule.userData ? (
        <My
          userData={userModule.userData}
          onClickLogout={userModule.handleLogout}
          editProfile={userModule.updateProfile}
          profileData={userModule.profileData}
          setProfileData={userModule.setProfileData}
          isOpen={isUpdateModalOpen}
          setIsOpen={setIsUpdateModalOpen}
        />
      ) : (
        <div>login page</div>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const allCookies = nextCookie(ctx);
  const userToken = allCookies["x-access-token"];

  if (userToken) {
    setToken(userToken);
    try {
      const initUserData = await getApi.getUserData("/users");
      return { props: { initUserData } };
    } catch (e) {
      return { props: {} };
    }
  } else {
    // 로그인 안 되어 있을 때
    // 로그인 페이지로 리다이렉트
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};
