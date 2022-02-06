// apis
import { getApi } from "@api/index";
// components
import { DirDetail } from "@components/templates";
// interfaces
import { CookieDataProps, SimpleDirDataProps } from "@interfaces/cookie";
import { GetAllDirProps } from "@interfaces/directory";
import { UserDataProps } from "@interfaces/user";
// libs
import nextCookie from "next-cookies";
import { NextPageContext } from "next";
import { returnCookieFilter } from "@lib/filter";
import Head from "next/head";
import { setToken } from "@lib/TokenManager";
// modules
import DirDetailModule from "@modules/DirDetailModule";
import DirModule from "@modules/DirModule";
import CookieModule from "@modules/CookieModule";

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
      </>
    );
  }

  return <div>error: login</div>;
};

export default DirDetailPage;

DirDetailPage.getInitialProps = async (ctx: NextPageContext) => {
  const allCookies = nextCookie(ctx);
  const userToken = allCookies["x-access-token"];
  const queryID = ctx.query.id;
  const { cookieFilter } = allCookies;

  // 로그인 되어 있을 때
  if (userToken) {
    setToken(userToken);
    // 일반 쿠키 데이터
    const initAllUnpinnedCookieData = await getApi.getAllCookieData(
      `/directories/${queryID}/unpinned/cookies?size=${COOKIE_PAGE_SIZE}&page=0&filter=${returnCookieFilter(
        cookieFilter,
      )}`,
    );
    // 고정 쿠키 데이터
    const initAllPinnedCookieData = await getApi.getAllCookieData(
      `/directories/${queryID}/pinned/cookies`,
    );
    // 디렉토리 상세 데이터
    const initDirInfoData = await getApi.getDirInfo(
      `/directories/${queryID}/info`,
    );
    // 디렉토리 데이터
    const initAllDirData = await getApi.getAllDirData("/directories");

    return {
      isLogin: true,
      initAllPinnedCookieData,
      initAllUnpinnedCookieData,
      initDirInfoData,
      initAllDirData,
      queryID,
    };
  }
  // 로그인 안 되어 있을 때
  // 로그인 페이지로 리다이렉트
  ctx.res?.writeHead(307, { Location: "/login" });
  ctx.res?.end();
  return {
    isLogin: false,
  };
};
