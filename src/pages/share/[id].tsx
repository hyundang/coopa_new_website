import { DirDetail } from "@components/templates";
import nextCookie from "next-cookies";
import getApi from "@api/getApi";
import { readCountAsc, readCountDesc } from "@lib/filter";
import { SharedDirectoryCookieDataProps } from "@interfaces/cookie";
import CookieModule from "@modules/CookieModule";
import { useToastMsg } from "src/hooks";

interface SharePageProps {
  initSharedDirDetailData: SharedDirectoryCookieDataProps;
  queryID: number;
}
const SharePage = ({ initSharedDirDetailData, queryID }: SharePageProps) => {
  // toast msg visible state
  const { isVisible, setIsVisible } = useToastMsg();

  // 쿠키 모듈
  const cookieModule = CookieModule({
    key: `/share/${queryID}`,
    initAllCookieData: initSharedDirDetailData.cookies,
    isVisible,
    setIsVisible,
  });

  return (
    <DirDetail
      isShared
      imgUrl={initSharedDirDetailData?.userInfo.profileImage}
      nickname={initSharedDirDetailData?.userInfo.name || ""}
      dirInfo={initSharedDirDetailData?.directoryInfo || { name: "", id: 0 }}
      cookies={cookieModule.filteredCookieData || []}
      filterType={cookieModule.cookieFilter}
      onClickType={cookieModule.handleCookieFilter}
      isToastMsgVisible={isVisible}
      setIsToastMsgVisible={setIsVisible}
      delCookieHandler={cookieModule.handleDelCookie}
      handleEditCookie={cookieModule.handleEditCookie}
      handleDirAddCookie={cookieModule.handleAddCookieToDir}
    />
  );
};
export default SharePage;

SharePage.getInitialProps = async (ctx: any) => {
  const allCookies = nextCookie(ctx);
  const queryID = ctx.query.id;

  // 쿠키 데이터
  const initSharedDirDetailData = await getApi.getSharedDirectoryData(
    `/share/${queryID}`,
  );
  const { cookieFilter } = allCookies;
  if (cookieFilter) {
    switch (cookieFilter) {
      case "readMost":
        initSharedDirDetailData?.cookies.sort(readCountDesc);
        break;
      case "readLeast":
        initSharedDirDetailData?.cookies.sort(readCountAsc);
        break;
      case "oldest":
        initSharedDirDetailData?.cookies.reverse();
        break;
      default:
        break;
    }
  }

  return {
    initSharedDirDetailData,
    queryID,
  };
};
