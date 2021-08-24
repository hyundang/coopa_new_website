import { DirDetail } from "@components/templates";
import { useRouter } from "next/router";
import getApi from "@api/getApi";
import useSWR from "swr";
import { useState } from "react";
import { readCountAsc, readCountDesc } from "@lib/filter";
import { CookieDataProps } from "@interfaces/cookie";
import postApi from "@api/postApi";

const DirDetailPage = () => {
  const router = useRouter();

  // 모든 디렉토리 데이터 get
  const { data: allDirData } = useSWR("/directories", getApi.getAllDirData, {
    onErrorRetry: ({ retryCount }) => {
      // 3번 까지만 재시도함
      if (retryCount >= 3) return undefined;
      return true;
    },
  });

  // 디렉토리 안 쿠키 데이터 get
  const { data: DirCookieData } = useSWR(
    `/directories/${router.query.id}`,
    getApi.getDirCookieData,
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
          DirCookieData && [...DirCookieData.cookies].sort(readCountDesc),
        );
        break;
      case "readLeast":
        setFilteredCookieData(
          DirCookieData && [...DirCookieData.cookies].sort(readCountAsc),
        );
        break;
      case "oldest":
        setFilteredCookieData(
          DirCookieData && [...DirCookieData.cookies].reverse(),
        );
        break;
      default:
        setFilteredCookieData(DirCookieData?.cookies);
        break;
    }
  };

  const handleShareClick = async () => {
    const shareToken = await postApi.postShareToken(Number(router.query.id));
    console.log(shareToken);
  };

  return (
    <DirDetail
      imgUrl="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
      nickname="hihi"
      dirInfo={DirCookieData?.directoryInfo || { name: "", id: 0 }}
      allDir={allDirData}
      cookies={filteredCookieData || []}
      filterType={cookieFilter}
      onClickType={handleCookieFilter}
      shareClick={handleShareClick}
      editClick={() => {}}
    />
  );
};
export default DirDetailPage;
