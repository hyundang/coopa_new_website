// apis
import getApi from "@api/getApi";
//components
import { DirDetail } from "@components/templates";
// interfaces
import { CookieDataProps, directoryInfoType } from "@interfaces/cookie";
//modules
import CookieModule from "@modules/CookieModule";

interface SharedDirDetailInfoProps {
  directoryInfo: directoryInfoType;
  userInfo: {
    name: string;
    profileImage: string;
  };
}

interface SharePageProps {
  initAllCookieData: CookieDataProps[];
  initSharedDirInfoData: SharedDirDetailInfoProps;
  queryID: number;
}
const SharePage = ({
  initAllCookieData,
  initSharedDirInfoData,
  queryID,
}: SharePageProps) => {
  const cookieModule = CookieModule({
    type: "dirShared",
    initAllPinnedCookieData: [],
    initAllUnpinnedCookieData: initAllCookieData,
    dirId: queryID,
  });

  return (
    <DirDetail
      isShared
      imgUrl={initSharedDirInfoData?.userInfo.profileImage}
      nickname={initSharedDirInfoData?.userInfo.name || ""}
      dirInfo={initSharedDirInfoData.directoryInfo}
      cookieModule={cookieModule}
      unpinnedCookieList={
        cookieModule.unpinnedCookieData?.reduce(
          (acc, curr) => curr && acc?.concat(curr),
          [],
        ) || []
      }
    />
  );
};
export default SharePage;

SharePage.getInitialProps = async (ctx: any) => {
  const queryID = ctx.query.id;

  // 쿠키 데이터
  const initAllCookieData = await getApi.getSharedDirectoryData(
    `/share/${queryID}/cookies`,
  );

  // 디렉토리 상세 정보
  const initSharedDirInfoData = await getApi.getSharedDirectoryData(
    `/share/${queryID}/info`,
  );

  return {
    initAllCookieData,
    initSharedDirInfoData,
    queryID,
  };
};
