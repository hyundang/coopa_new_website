import { DirDetail } from "@components/templates";
import nextCookie from "next-cookies";
import { DirectoryCookieDataProps } from "@interfaces/cookie";
import { GetDirectoryDataProps } from "@interfaces/directory";
import { UserDataProps } from "@interfaces/user";
import getApi from "@api/getApi";
import postApi from "@api/postApi";
import DirDetailModule from "@modules/DirDetailModule";
import DirModule from "@modules/DirModule";
import { useState } from "react";
import { NextPageContext } from "next";
import { returnCookieFilter } from "@lib/filter";
import { useRecoilState } from "recoil";
import { ToastMsgState } from "@modules/states";

interface DirDetailPageProps {
  isLogin: boolean;
  initUserData: UserDataProps;
  initDirDetailData: DirectoryCookieDataProps;
  initAllDirData: GetDirectoryDataProps;
  queryID: number;
}
const DirDetailPage = ({
  isLogin,
  initUserData,
  initDirDetailData,
  initAllDirData,
  queryID,
}: DirDetailPageProps) => {
  // share link url
  const [shareLink, setShareLink] = useState("");

  // toast msg
  const [isToastMsgVisible, setIsToastMsgVisible] =
    useRecoilState(ToastMsgState);

  // 디렉토리 상세 모듈
  const dirDetailModule = DirDetailModule({
    key: `/directories/${queryID}`,
    initDirDetailData,
  });

  // 디렉토리 모듈
  const dirModule = DirModule({
    initAllDirData,
  });

  // 디렉토리 delete
  const handleDelDir = async (dirId: number) => {
    await dirModule.handleDelDir(dirId);
    window.open(DOMAIN, "_self");
  };

  const handleShareClick = async () => {
    const shareToken = await postApi.postShareToken(queryID);
    setIsToastMsgVisible({ ...isToastMsgVisible, copyShareLink: true });
    setShareLink(`${DOMAIN}/share/${shareToken}`);
  };

  return (
    <>
      {isLogin ? (
        <DirDetail
          imgUrl={initUserData?.profileImage}
          nickname={initUserData?.name || ""}
          dirInfo={dirDetailModule.dirInfo || { name: "", id: 0 }}
          allDir={dirModule.allDirData?.common}
          fixedDir={dirModule.allDirData?.pinned}
          handlePostDir={dirModule.handlePostDir}
          handleDelDirectory={handleDelDir}
          shareLink={shareLink}
          shareClick={handleShareClick}
          dirDetailModule={dirDetailModule}
          fixCookieHandler={() => {}}
        />
      ) : (
        <div>error: login</div>
      )}
    </>
  );
};
export default DirDetailPage;

DirDetailPage.getInitialProps = async (ctx: NextPageContext) => {
  const allCookies = nextCookie(ctx);
  const userToken = allCookies["x-access-token"];
  const queryID = ctx.query.id;
  const { cookieFilter } = allCookies;

  // 로그인 되어 있을 때
  if (userToken) {
    // 쿠키 데이터
    const initDirDetailData = await getApi.getDirCookieData(
      `/directories/${queryID}?size=${COOKIE_PAGE_SIZE}&page=0&filter=${returnCookieFilter(
        cookieFilter,
      )}`,
    );

    // 디렉토리 데이터
    const initAllDirData = await getApi.getAllDirData("/directories");

    return {
      isLogin: true,
      initDirDetailData,
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
