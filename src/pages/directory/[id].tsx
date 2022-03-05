// apis
import { getApi } from "@api/index";
// assets
import { NetworkErrorImg } from "@assets/imgs/error";
// components
import { DirDetail, NewtabError } from "@components/templates";
// interfaces
import { CookieDataProps, SimpleDirDataProps } from "@interfaces/cookie";
import { GetAllDirProps } from "@interfaces/directory";
import { UserDataProps } from "@interfaces/user";
// libs
import nextCookie from "next-cookies";
import { GetServerSideProps } from "next";
import { returnCookieFilter, returnDirFilter } from "@lib/filter";
import Head from "next/head";
import { setToken } from "@lib/TokenManager";
import { Offline, Online } from "react-detect-offline";
// modules
import DirDetailModule from "@modules/DirDetailModule";
import DirModule from "@modules/DirModule";
import CookieModule from "@modules/CookieModule";
import ErrorModule from "@modules/ErrorModule";
import { useEffect } from "react";

interface DirDetailPageProps {
  isLogin: boolean;
  initUserData: UserDataProps;
  initAllPinnedCookieData: CookieDataProps[];
  initAllUnpinnedCookieData: CookieDataProps[];
  initDirInfoData: SimpleDirDataProps;
  initAllDirData: GetAllDirProps;
  queryID: number;
}
const DirDetailPage = ({
  isLogin,
  initUserData,
  initAllPinnedCookieData,
  initAllUnpinnedCookieData,
  initDirInfoData,
  initAllDirData,
  queryID,
}: DirDetailPageProps) => {
  if (isLogin) {
    // 쿠키 모듈
    const cookieModule = CookieModule({
      type: "dirDetail",
      dirId: queryID,
      initAllPinnedCookieData,
      initAllUnpinnedCookieData,
    });

    // 디렉토리 상세 모듈
    const dirDetailModule = DirDetailModule({
      dirId: queryID,
      initDirInfoData,
    });

    // 디렉토리 모듈
    const dirModule = DirModule({
      initAllDirData,
    });

    const errorModule = ErrorModule();

    useEffect(() => {
      errorModule.setHomeboardImgUrl();
      errorModule.setBookmark();
    }, []);

    return (
      <>
        <Head>
          <title>{initDirInfoData.name}</title>
          <meta name="description" content={initDirInfoData.name} />
          <meta name="Author" content={initUserData.name} />
          <meta property="og:title" content={initDirInfoData.name} />
          <meta property="og:description" content={initDirInfoData.name} />
          <meta property="og:site_name" content="cookieparking" />
          <meta
            property="og:image"
            content="https://coopa-default.s3.ap-northeast-2.amazonaws.com/og_thumbnail.png"
          />
          <meta
            property="og:url"
            content={`https://www.cookieparking.com/directory/${queryID}`}
          />
          <meta name="twitter:title" content={initDirInfoData.name} />
          <meta name="twitter:description" content={initDirInfoData.name} />
          <meta
            name="twitter:image"
            content="https://coopa-default.s3.ap-northeast-2.amazonaws.com/og_thumbnail.png"
          />
          <meta
            name="twitter:url"
            content={`https://www.cookieparking.com/directory/${queryID}`}
          />
        </Head>
        <Offline>
          <NewtabError
            homeboardImg={errorModule.homeboardImg}
            bookmarkDatas={errorModule.bookmarkData || []}
            errorImg={NetworkErrorImg}
            errorImgWidth={183}
            text="앗, 인터넷 연결을 확인해주세요! 😮"
            text2="확인 후 다시 도전하시겠어요?"
          />
        </Offline>
        <Online>
          <DirDetail
            // 유저 관련
            imgUrl={initUserData?.profileImage}
            nickname={initUserData?.name || ""}
            // 디렉토리 관련
            dirDetailModule={dirDetailModule}
            dirInfo={dirDetailModule.dirInfo || { name: "", id: -1 }}
            unpinnedDir={dirModule.unpinnedDirData}
            pinnedDir={dirModule.pinnedDirData}
            createDir={dirModule.createDir}
            // 쿠키 관련
            cookieModule={cookieModule}
            unpinnedCookieList={
              cookieModule.unpinnedCookieData?.reduce(
                (acc, curr) => curr && acc?.concat(curr),
                [],
              ) || []
            }
          />
        </Online>
      </>
    );
  }

  return <div>error: login</div>;
};

export default DirDetailPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const allCookies = nextCookie(ctx);
  const userToken = allCookies["x-access-token"];
  const queryID = ctx.query.id;
  const { cookieFilter } = allCookies;
  const { dirFilter } = allCookies;

  // 로그인 되어 있을 때
  if (userToken) {
    setToken(userToken);
    try {
      const initUserData = await getApi.getUserData("/users");
      // 일반 쿠키 데이터
      const initAllUnpinnedCookieData = await getApi.getAllCookieData(
        `/directories/${queryID}/unpinned/cookies?size=${COOKIE_PAGE_SIZE}&page=0&filter=${returnCookieFilter(
          cookieFilter,
        )}`,
      );
      // 고정 쿠키 데이터
      const initAllPinnedCookieData = await getApi.getAllCookieData(
        `/directories/${queryID}/pinned/cookies?filter=2`,
      );
      // 디렉토리 상세 데이터
      const initDirInfoData = await getApi.getDirInfo(
        `/directories/${queryID}/info`,
      );
      // 디렉토리 데이터
      const initAllDirData = await getApi.getAllDirData(
        `/directories?filter=${returnDirFilter(dirFilter)}`,
      );

      return {
        props: {
          initUserData,
          isLogin: true,
          initAllPinnedCookieData,
          initAllUnpinnedCookieData,
          initDirInfoData,
          initAllDirData,
          queryID,
        },
      };
    } catch (e) {
      // query id 잘못되었을 때
      return { notFound: true };
    }
  }
  // 로그인 안 되어 있을 때
  // 로그인 페이지로 리다이렉트
  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
};
