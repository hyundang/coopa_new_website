// apis
import { getApi } from "@api/index";
// assets
import { NetworkErrorImg } from "@assets/imgs/error";
// components
import { Newtab, NewtabError } from "@components/templates";
// interfaces
import { BookmarkDataProps } from "@interfaces/homeboard";
import { CookieDataProps } from "@interfaces/cookie";
import { GetAllDirProps } from "@interfaces/directory";
import { UserDataProps } from "@interfaces/user";
// libs
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import nextCookie from "next-cookies";
import { mutate } from "swr";
import { returnCookieFilter, returnDirFilter } from "@lib/filter";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Offline, Online } from "react-detect-offline";
// modules
import { CookieModule, DirModule, HomebrdModule } from "@modules/index";
import { HomeboardState } from "@modules/states";
import { setToken } from "@lib/TokenManager";

interface NewtabPageProps {
  initUserData: UserDataProps;
  initAllPinnedCookieData: CookieDataProps[];
  initAllUnpinnedCookieData: CookieDataProps[];
  initAllDirData: GetAllDirProps;
  initBookmarkData: BookmarkDataProps[];
  initHomeboardImgUrl?: string;
}
export default function NewtabPage({
  initUserData,
  initAllPinnedCookieData,
  initAllUnpinnedCookieData,
  initAllDirData,
  initBookmarkData,
  initHomeboardImgUrl,
}: NewtabPageProps) {
  // 홈보드 모듈
  const homebrdModule = HomebrdModule({
    initHomeboardImgUrl,
    initBookmarkData,
  });

  useEffect(() => {
    // 홈보드, 홈보드 모달 이미지 세팅
    const homeboardImgUrl = localStorage.getItem("homeboardImgUrl");
    homeboardImgUrl?.length === 1
      ? (() => {
          homebrdModule.setHomeboardImg(
            `/theme_img/img_${homeboardImgUrl}.jpg`,
          );
          homebrdModule.setHomeboardModalImg(
            // `/theme_img/img_${homeboardImgUrl}.jpg`,
            "",
          );
        })()
      : !initHomeboardImgUrl &&
        (homeboardImgUrl !== null
          ? (() => {
              homebrdModule.setHomeboardImg(homeboardImgUrl);
              homebrdModule.setHomeboardModalImg(homeboardImgUrl);
            })()
          : homebrdModule.getHomeboardImg());

    // 북마크 세팅
    const bookmark = localStorage.getItem("bookmark");
    !initBookmarkData &&
      bookmark !== null &&
      mutate("/users/favorites", JSON.parse(bookmark), false);
  }, []);

  // 검색 여부
  const setIsSearched = useSetRecoilState(HomeboardState.IsSearchedState);
  // 검색어
  const searchValue = useRecoilValue(HomeboardState.SearchValueState);

  // 쿠키 모듈
  const cookieModule = CookieModule({
    type: "newtab",
    initAllPinnedCookieData: initAllPinnedCookieData || [],
    initAllUnpinnedCookieData: initAllUnpinnedCookieData || [],
  });

  // 디렉토리 모듈
  const dirModule = DirModule({
    initAllDirData: initAllDirData || { common: [], pinned: [] },
  });

  // 검색창 enter 키 클릭 시
  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsSearched(true);
      mutate(
        "/cookies/search",
        await getApi.getSearchedCookieData(searchValue),
        false,
      );
      mutate(
        "/directories/search",
        await getApi.getSearchedDirData(searchValue),
        false,
      );
    }
  };

  return (
    <>
      <Offline>
        <NewtabError
          homeboardImg={homebrdModule.homeboardImg}
          bookmarkDatas={homebrdModule.bookmarkData || []}
          errorImg={NetworkErrorImg}
          errorImgWidth={183}
          text="앗, 인터넷 연결을 확인해주세요! 😮"
          text2="확인 후 다시 도전하시겠어요?"
        />
      </Offline>
      <Online>
        <Newtab
          // 유저 데이터 관련
          imgUrl={initUserData?.profileImage}
          nickname={initUserData?.name}
          // 홈보드 관련
          onKeyPress={handleKeyPress}
          homeboardModule={homebrdModule}
          // 쿠키 관련
          cookieModule={cookieModule}
          unpinnedCookieList={
            cookieModule.unpinnedCookieData?.reduce(
              (acc, curr) => curr && acc?.concat(curr),
              [],
            ) || []
          }
          // 디렉토리 관련
          dirModule={dirModule}
        />
      </Online>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const allCookies = nextCookie(ctx);
  const userToken = allCookies["x-access-token"];
  const { dirFilter } = allCookies;
  const { cookieFilter } = allCookies;

  // 로그인 되어 있을 때
  if (userToken) {
    setToken(userToken);
    try {
      const initUserData = await getApi.getUserData("/users");
      if (initUserData) {
        // 개인 뉴탭으로 리다이렉트
        if (Number(ctx.query.id) !== initUserData.id) {
          return {
            redirect: {
              destination: `/${initUserData.id}`,
              permanent: false,
            },
          };
        }
        // 쿠키 데이터
        const initAllPinnedCookieData = await getApi.getAllCookieData(
          `/cookies/pinned?filter=2`,
        );
        const initAllUnpinnedCookieData = await getApi.getAllCookieData(
          `/cookies?size=${COOKIE_PAGE_SIZE}&page=0&filter=${returnCookieFilter(
            cookieFilter,
          )}`,
        );

        // 디렉토리 데이터
        const initAllDirData = await getApi.getAllDirData(
          `/directories?filter=${returnDirFilter(dirFilter)}`,
        );

        // 북마크 데이터
        const initBookmarkData = await getApi.getBookmarkData(
          "/users/favorites",
        );

        // 홈보드 이미지
        const initHomeboardImgUrl = await getApi.getHomeboardData();

        return {
          props: {
            initUserData,
            initAllPinnedCookieData,
            initAllUnpinnedCookieData,
            initAllDirData,
            initBookmarkData,
            initHomeboardImgUrl,
          },
        };
      }
    } catch (e) {
      return { props: {} };
    }
  }
  // 로그인 안 되어 있을 때
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};
