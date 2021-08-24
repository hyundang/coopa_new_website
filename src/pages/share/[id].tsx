import { DirDetail } from "@components/templates";
import { useRouter } from "next/router";
import getApi from "@api/getApi";
import useSWR from "swr";
import { useState } from "react";
import { readCountAsc, readCountDesc } from "@lib/filter";
import { CookieDataProps } from "@interfaces/cookie";

const SharePage = () => {
  const router = useRouter();

  // 공유 디렉토리 안 쿠키 데이터 get
  const { data: sharedDirCookieData } = useSWR(
    `/share/${router.query.id}`,
    getApi.getSharedDirectoryData,
    {
      onErrorRetry: ({ retryCount }) => {
        // 3번 까지만 재시도함
        if (retryCount >= 3) return undefined;
        return true;
      },
      onSuccess: (data) => {
        const filter = localStorage.getItem("cookieFilter");
        if (data && filter !== null) {
          switch (filter) {
            case "readMost":
              setCookieFilter("readMost");
              setFilteredCookieData([...data.cookies].sort(readCountDesc));
              break;
            case "readLeast":
              setCookieFilter("readLeast");
              setFilteredCookieData([...data.cookies].sort(readCountAsc));
              break;
            case "oldest":
              setCookieFilter("oldest");
              setFilteredCookieData([...data.cookies].reverse());
              break;
            default:
              setCookieFilter("latest");
              setFilteredCookieData([...data.cookies]);
              break;
          }
        }
      },
    },
  );
  // 쿠키 필터
  const [cookieFilter, setCookieFilter] = useState<
    "latest" | "readMost" | "readLeast" | "oldest"
  >("latest");
  // 필터링 된 쿠키 데이터
  const [filteredCookieData, setFilteredCookieData] = useState<
    CookieDataProps[] | undefined
  >([]);

  // 쿠키 필터 변경
  const handleCookieFilter = (
    filter: "latest" | "readMost" | "readLeast" | "oldest" | "abc",
  ) => {
    filter !== "abc" && setCookieFilter(filter);
    localStorage.setItem("cookieFilter", filter);
    switch (filter) {
      case "readMost":
        setFilteredCookieData(
          sharedDirCookieData &&
            [...sharedDirCookieData.cookies].sort(readCountDesc),
        );
        break;
      case "readLeast":
        setFilteredCookieData(
          sharedDirCookieData &&
            [...sharedDirCookieData.cookies].sort(readCountAsc),
        );
        break;
      case "oldest":
        setFilteredCookieData(
          sharedDirCookieData && [...sharedDirCookieData.cookies].reverse(),
        );
        break;
      default:
        setFilteredCookieData(sharedDirCookieData?.cookies);
        break;
    }
  };

  return (
    <DirDetail
      isShared
      imgUrl={sharedDirCookieData?.userInfo.profileImage}
      nickname={sharedDirCookieData?.userInfo.name || ""}
      dirInfo={sharedDirCookieData?.directoryInfo || { name: "", id: 0 }}
      cookies={filteredCookieData || []}
      filterType={cookieFilter}
      onClickType={handleCookieFilter}
    />
  );
};
export default SharePage;
