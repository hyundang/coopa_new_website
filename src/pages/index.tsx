// assets
import { NotFoundErrorImg } from "@assets/imgs/error";
// apis
import { getApi } from "@api/index";
// components
import { NewtabError } from "@components/templates";
// libs
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import nextCookie from "next-cookies";
import { mutate } from "swr";
// modules
import { HomebrdModule } from "@modules/index";
import { setToken } from "@lib/TokenManager";

const NewtabPage = () => {
  // 홈보드 모듈
  const homebrdModule = HomebrdModule({
    initHomeboardImgUrl: undefined,
    initBookmarkData: [],
  });

  useEffect(() => {
    // 홈보드, 홈보드 모달 이미지 세팅
    const homeboardImgUrl = localStorage.getItem("homeboardImgUrl");
    homeboardImgUrl?.length === 1
      ? (() => {
          homebrdModule.setHomeboardImg(
            `/theme_img/img_${homeboardImgUrl}.jpg`,
          );
          homebrdModule.setHomeboardModalImg("");
        })()
      : homeboardImgUrl !== null
      ? (() => {
          homebrdModule.setHomeboardImg(homeboardImgUrl);
          homebrdModule.setHomeboardModalImg(homeboardImgUrl);
        })()
      : homebrdModule.getHomeboardImg();

    // 북마크 세팅
    const bookmark = localStorage.getItem("bookmark");
    bookmark !== null &&
      mutate("/users/favorites", JSON.parse(bookmark), false);
  }, []);

  return (
    <NewtabError
      homeboardImg={homebrdModule.homeboardImg}
      bookmarkDatas={homebrdModule.bookmarkData || []}
      errorImg={NotFoundErrorImg}
      errorImgWidth={141}
      text="앗, 로그인이 필요한 페이지에요! 😮"
      text2="로그인 후 함께하시겠어요?"
      isLoginError
    />
  );
};

export default NewtabPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const allCookies = nextCookie(ctx);
  const userToken = allCookies["x-access-token"];

  // 로그인 되어 있을 때
  if (userToken) {
    setToken(userToken);
    try {
      const initUserData = await getApi.getUserData("/users");
      // 개인 뉴탭으로 리다이렉트
      if (initUserData) {
        return {
          redirect: {
            destination: `/${initUserData.id}`,
            permanent: false,
          },
        };
      }
    } catch (e) {
      return { props: {} };
    }
  }
  // 로그인 안 되어 있을 때
  return { props: {} };
};
