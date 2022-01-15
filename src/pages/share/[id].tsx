// apis
import getApi from "@api/getApi";
//components
import { DirDetail } from "@components/templates";
// interfaces
import { CookieDataProps, directoryInfoType } from "@interfaces/cookie";
//libs
import Head from "next/head";
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
    <>
      <Head>
        <title>{initSharedDirInfoData.directoryInfo.name}</title>
        <meta
          name="description"
          content={initSharedDirInfoData.directoryInfo.name}
        />
        <meta name="Author" content={initSharedDirInfoData.userInfo.name} />
        <meta
          property="og:title"
          content={initSharedDirInfoData.directoryInfo.name}
        />
        <meta
          property="og:description"
          content={initSharedDirInfoData.directoryInfo.name}
        />
        <meta property="og:site_name" content="cookieparking" />
        <meta
          property="og:image"
          content="https://coopa-default.s3.ap-northeast-2.amazonaws.com/og_thumbnail.png"
        />
        <meta
          property="og:url"
          content={`https://www.cookieparking.com/share/${queryID}`}
        />
        <meta
          name="twitter:title"
          content={initSharedDirInfoData.directoryInfo.name}
        />
        <meta
          name="twitter:description"
          content={initSharedDirInfoData.directoryInfo.name}
        />
        <meta
          name="twitter:image"
          content="https://coopa-default.s3.ap-northeast-2.amazonaws.com/og_thumbnail.png"
        />
        <meta
          name="twitter:url"
          content={`https://www.cookieparking.com/share/${queryID}`}
        />
      </Head>
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
    </>
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
