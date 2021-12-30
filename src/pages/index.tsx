// assets
import { NotFoundErrorImg } from "@assets/imgs/error";
// apis
import { getApi } from "@api/index";
// components
import { NewtabError, Newtab } from "@components/templates";
// interfaces
import { BookmarkDataProps } from "@interfaces/homeboard";
import { CookieDataProps } from "@interfaces/cookie";
import { GetDirectoryDataProps } from "@interfaces/directory";
import { UserDataProps } from "@interfaces/user";
// libs
import { useEffect } from "react";
import nextCookie from "next-cookies";
import { mutate } from "swr";
import { returnCookieFilter, returnDirFilter } from "@lib/filter";
import { useRecoilValue, useSetRecoilState } from "recoil";
// modules
import { CookieModule, DirModule, HomebrdModule } from "@modules/index";
import { HomeboardState } from "@modules/states";

interface NewtabPageProps {
  isLogin: boolean;
  initUserData: UserDataProps;
  initAllCookieData: CookieDataProps[];
  initAllDirData: GetDirectoryDataProps;
  initBookmarkData: BookmarkDataProps[];
  initHomeboardImgUrl?: string;
}
export default function NewtabPage({
  isLogin,
  initUserData,
  initAllCookieData,
  initAllDirData,
  initBookmarkData,
  initHomeboardImgUrl,
}: NewtabPageProps) {
  // 검색 여부
  const setIsSearched = useSetRecoilState(HomeboardState.IsSearchedState);
  // 검색어
  const searchValue = useRecoilValue(HomeboardState.SearchValueState);

  // 홈보드 모듈
  const homebrdModule = HomebrdModule({
    initHomeboardImgUrl,
    initBookmarkData,
  });

  // 쿠키 모듈
  const cookieModule = CookieModule({
    initAllCookieData,
  });

  // 디렉토리 모듈
  const dirModule = DirModule({
    initAllDirData,
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
          : homebrdModule.handleGetHomeboardImg());

    // 북마크 세팅
    const bookmark = localStorage.getItem("bookmark");
    !initBookmarkData &&
      bookmark !== null &&
      mutate("/users/favorites", JSON.parse(bookmark), false);
  }, []);

  return (
    <>
      {isLogin ? (
        <Newtab
          // 유저 데이터 관련
          imgUrl={initUserData?.profileImage}
          nickname={initUserData?.name}
          // 홈보드 관련
          onKeyPress={handleKeyPress}
          homeboardModule={homebrdModule}
          // 쿠키 데이터 관련
          isCookieLoading={cookieModule.isLoading}
          cookieData={
            cookieModule.cookieData?.reduce(
              (acc, curr) => curr && acc?.concat(curr),
              [],
            ) || []
          }
          searchedCookieData={cookieModule.searchedCookieData || []}
          cookieModule={cookieModule}
          // 디렉토리 데이터 관련
          dirData={dirModule.allDirData || { common: [], pinned: [] }}
          searchedDirData={dirModule.searchedDirData || []}
          dirModule={dirModule}
        />
      ) : (
        <NewtabError
          imgUrl={initUserData?.profileImage}
          homeboardImg={homebrdModule.homeboardImg}
          bookmarkDatas={homebrdModule.bookmarkData || []}
          errorImg={NotFoundErrorImg}
          errorImgWidth={141}
          text="앗, 로그인이 필요한 페이지에요! 😮"
          text2="로그인 후 함께하시겠어요?"
          isLoginError
        />
      )}
    </>
  );
}

NewtabPage.getInitialProps = async (ctx: any) => {
  const allCookies = nextCookie(ctx);
  const userToken = allCookies["x-access-token"];
  const { dirFilter } = allCookies;
  const { cookieFilter } = allCookies;

  // 로그인 되어 있을 때
  if (userToken) {
    // 쿠키 데이터
    const initAllCookieData = await getApi.getAllCookieData(
      `/cookies?size=${COOKIE_PAGE_SIZE}&page=0&filter=${returnCookieFilter(
        cookieFilter,
      )}`,
    );

    // 디렉토리 데이터
    const initAllDirData = await getApi.getAllDirData(
      `/directories?filter=${returnDirFilter(dirFilter)}`,
    );

    // 북마크 데이터
    const initBookmarkData = await getApi.getBookmarkData("/users/favorites");

    // 홈보드 이미지
    const initHomeboardImgUrl = await getApi.getHomeboardData();

    return {
      isLogin: true,
      initAllCookieData,
      initAllDirData,
      initBookmarkData,
      initHomeboardImgUrl,
    };
  }
  // 로그인 안 되어 있을 때
  return {
    isLogin: false,
  };
};
