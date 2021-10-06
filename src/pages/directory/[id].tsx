import { DirDetail } from "@components/templates";
import nextCookie from "next-cookies";
import {
  idCountAsc,
  idCountDesc,
  readCountAsc,
  readCountDesc,
} from "@lib/filter";
import { DirectoryCookieDataProps } from "@interfaces/cookie";
import { DirectoryDataProps } from "@interfaces/directory";
import { UserDataProps } from "@interfaces/user";
import getApi from "@api/getApi";
import postApi from "@api/postApi";
import CookieModule from "@modules/CookieModule";
import DirModule from "@modules/DirModule";
import { useToastMsg } from "src/hooks";
import { useState } from "react";

interface DirDetailPageProps {
  isLogin: boolean;
  initUserData: UserDataProps;
  initDirDetailData: DirectoryCookieDataProps;
  initAllDirData: DirectoryDataProps[];
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
  // toast msg visible state
  const { isVisible, setIsVisible } = useToastMsg();

  // 쿠키 모듈
  const cookieModule = CookieModule({
    key: `/directories/${queryID}`,
    initAllCookieData: initDirDetailData.cookies,
    isVisible,
    setIsVisible,
  });

  // 디렉토리 모듈
  const dirModule = DirModule({
    initAllDirData,
    isVisible,
    setIsVisible,
  });

  // 디렉토리 delete
  const handleDelDir = async (dirId: number) => {
    await dirModule.handleDelDir(dirId);
    window.open(DOMAIN, "_self");
  };

  const handleShareClick = async () => {
    const shareToken = await postApi.postShareToken(queryID);
    setIsVisible({ ...isVisible, copyShareLink: true });
    setShareLink(`${DOMAIN}/share/${shareToken}`);
  };

  return (
    <>
      {isLogin ? (
        <DirDetail
          imgUrl={initUserData?.profileImage}
          nickname={initUserData?.name || ""}
          dirInfo={initDirDetailData?.directoryInfo || { name: "", id: 0 }}
          allDir={initAllDirData}
          cookies={cookieModule.filteredCookieData || []}
          filterType={cookieModule.cookieFilter}
          onClickType={cookieModule.handleCookieFilter}
          shareLink={shareLink}
          shareClick={handleShareClick}
          isToastMsgVisible={isVisible}
          setIsToastMsgVisible={setIsVisible}
          postDir={dirModule.handlePostDir}
          copyCookieLink={cookieModule.copyCookieLink}
          delCookieHandler={cookieModule.handleDelCookie}
          handleEditCookie={cookieModule.handleEditCookie}
          handleDelDirectory={handleDelDir}
          handleDirAddCookie={cookieModule.handleAddCookieToDir}
          handleUpdateDirectory={dirModule.handleEditDir}
          handleAddCookieCount={cookieModule.handleAddCookieCount}
        />
      ) : (
        <div>error: login</div>
      )}
    </>
  );
};
export default DirDetailPage;

DirDetailPage.getInitialProps = async (ctx: any) => {
  const allCookies = nextCookie(ctx);
  const userToken = allCookies["x-access-token"];
  const queryID = ctx.query.id;

  // 로그인 되어 있을 때
  if (userToken) {
    // 쿠키 데이터
    const initDirDetailData = await getApi.getDirCookieData(
      `/directories/${queryID}`,
    );
    const { cookieFilter } = allCookies;
    if (cookieFilter) {
      switch (cookieFilter) {
        case "readMost":
          initDirDetailData?.cookies.sort(readCountDesc);
          break;
        case "readLeast":
          initDirDetailData?.cookies.sort(readCountAsc);
          break;
        case "oldest":
          initDirDetailData?.cookies.reverse();
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

    return {
      isLogin: true,
      initDirDetailData,
      initAllDirData,
      queryID,
    };
  }
  // 로그인 안 되어 있을 때
  return {
    isLogin: false,
  };
};
