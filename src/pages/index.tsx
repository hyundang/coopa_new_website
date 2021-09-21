import { NotFoundErrorImg } from "@assets/imgs/error";
import { NewtabError, Newtab } from "@components/templates";
import { BookmarkDataProps } from "@interfaces/homeboard";
import { CookieDataProps } from "@interfaces/cookie";
import { DirectoryDataProps } from "@interfaces/directory";
import { UserDataProps } from "@interfaces/user";
import {
  readCountDesc,
  readCountAsc,
  idCountAsc,
  idCountDesc,
} from "@lib/filter";
import { getApi } from "@lib/api";
import { useEffect, useState } from "react";
import nextCookie from "next-cookies";
import { mutate } from "swr";
import { useRouterLoading, useToastMsg } from "src/hooks";
import { CookieModule, DirModule, HomebrdModule } from "src/modules";

interface NewtabPageProps {
  isLogin: boolean;
  initUserData: UserDataProps;
  initAllCookieData: CookieDataProps[];
  initAllDirData: DirectoryDataProps[];
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
  // 로딩 여부
  const isLoading = useRouterLoading();

  // 검색 여부
  const [isSearched, setIsSearched] = useState(false);
  // 검색어
  const [searchValue, setSearchValue] = useState("");

  // toast msg visible state
  const { isVisible, setIsVisible } = useToastMsg();

  // 홈보드 모듈
  const homebrdModule = HomebrdModule({
    initHomeboardImgUrl,
    initBookmarkData,
    isVisible,
    setIsVisible,
  });

  // 쿠키 모듈
  const cookieModule = CookieModule({
    key: "/cookies",
    initAllCookieData,
    isVisible,
    setIsVisible,
  });

  // 디렉토리 모듈
  const dirModule = DirModule({
    initAllDirData,
    isVisible,
    setIsVisible,
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
    // 홈보드 이미지 세팅
    const homeboardImgUrl = localStorage.getItem("homeboardImgUrl");
    homeboardImgUrl?.length === 1
      ? homebrdModule.setHomeboardImg(`/theme_img/img_${homeboardImgUrl}.jpg`)
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
          isLoading={isLoading}
          isSearched={isSearched}
          setIsSearched={setIsSearched}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onKeyPress={handleKeyPress}
          imgUrl={initUserData?.profileImage}
          nickname={initUserData?.name}
          homeboardModalImg={homebrdModule.homeboardModalImg}
          setHomeboardModalImg={homebrdModule.setHomeboardModalImg}
          homeboardImg={homebrdModule.homeboardImg}
          setHomeboardImg={homebrdModule.setHomeboardImg}
          postHomeboardImg={homebrdModule.handlePostHomeboardImg}
          bookmarkDatas={homebrdModule.bookmarkData || []}
          onClickBookmarkSave={homebrdModule.handleAddBookmark}
          onClickBookmarkDel={homebrdModule.handleDelBookmark}
          cookieData={cookieModule.filteredCookieData || []}
          searchedCookieData={cookieModule.searchedCookieData || []}
          cookieFilter={cookieModule.cookieFilter}
          setCookieFilter={cookieModule.handleCookieFilter}
          dirData={dirModule.filteredDirData || []}
          searchedDirData={dirModule.searchedDirData || []}
          dirFilter={dirModule.dirFilter}
          setDirFilter={dirModule.handleDirFilter}
          isToastMsgVisible={isVisible}
          setIsToastMsgVisible={setIsVisible}
          postDir={dirModule.handlePostDir}
          delCookieHandler={cookieModule.handleDelCookie}
          handleEditCookie={cookieModule.handleEditCookie}
          handleDelDirectory={dirModule.handleDelDir}
          handleDirAddCookie={cookieModule.handleAddCookieToDir}
          handleUpdateDirectory={dirModule.handleEditDir}
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

  // 로그인 되어 있을 때
  if (userToken) {
    // 쿠키 데이터
    const initAllCookieData = await getApi.getAllCookieData("/cookies");
    const { cookieFilter } = allCookies;
    if (cookieFilter) {
      switch (cookieFilter) {
        case "readMost":
          initAllCookieData?.sort(readCountDesc);
          break;
        case "readLeast":
          initAllCookieData?.sort(readCountAsc);
          break;
        case "oldest":
          initAllCookieData?.reverse();
          break;
        default:
          break;
      }
    }

    // 디렉토리 데이터
    const initAllDirData = await getApi.getAllDirData("/directories");
    const { dirFilter } = allCookies;
    if (dirFilter) {
      switch (dirFilter) {
        case "latest":
          initAllDirData?.sort(idCountDesc);
          break;
        case "oldest":
          initAllDirData?.sort(idCountAsc);
          break;
        default:
          break;
      }
    }

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
