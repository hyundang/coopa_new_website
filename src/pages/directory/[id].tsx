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
import DirDetailModule from "@modules/DirDetailModule";
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

  // 디렉토리 상세 모듈
  const dirDetailModule = DirDetailModule({
    key: `/directories/${queryID}`,
    initDirDetailData,
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
          dirInfo={dirDetailModule.dirInfo || { name: "", id: 0 }}
          allDir={dirModule.filteredDirData}
          cookies={dirDetailModule.filteredCookieData || []}
          filterType={dirDetailModule.cookieFilter}
          onClickType={dirDetailModule.handleCookieFilter}
          shareLink={shareLink}
          shareClick={handleShareClick}
          isToastMsgVisible={isVisible}
          setIsToastMsgVisible={setIsVisible}
          postDir={dirModule.handlePostDir}
          copyCookieLink={dirDetailModule.copyCookieLink}
          delCookieHandler={dirDetailModule.handleDelCookie}
          handleEditCookie={dirDetailModule.handleEditCookie}
          handleDelDirectory={handleDelDir}
          handleDirAddCookie={dirDetailModule.handleAddCookieToDir}
          handleUpdateDirectory={dirDetailModule.handleEditDir}
          handleAddCookieCount={dirDetailModule.handleAddCookieCount}
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
  return {
    isLogin: false,
  };
};
