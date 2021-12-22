import useSWR, { useSWRInfinite } from "swr";
import reactCookie from "react-cookies";
import { Dispatch, SetStateAction, useState } from "react";
import { CookieDataProps } from "@interfaces/cookie";
import { PostAddCookieToDirProps } from "@interfaces/directory";
import { ToastMsgVisibleStateProps } from "@interfaces/toastMsg";
import getApi from "@api/getApi";
import delApi from "@api/delApi";
import putApi from "@api/putApi";
import postApi from "@api/postApi";
import { returnCookieFilter } from "@lib/filter";

interface CookieModuleProps {
  /** initial cookie datas */
  initAllCookieData: CookieDataProps[];
  /** toast msg */
  isVisible: ToastMsgVisibleStateProps;
  setIsVisible: Dispatch<SetStateAction<ToastMsgVisibleStateProps>>;
}
const CookieModule = ({
  initAllCookieData,
  isVisible,
  setIsVisible,
}: CookieModuleProps) => {
  // 쿠키 필터
  const initFilter = reactCookie.load("cookieFilter");
  const [cookieFilter, setCookieFilter] = useState<
    "latest" | "readMost" | "readLeast" | "oldest"
  >(initFilter || "latest");

  // 쿠키 데이터 key 함수
  const getKey = (pageIndex: number, previousPageData: any) => {
    console.log(pageIndex);
    if (previousPageData && !previousPageData.length) return null; // 끝에 도달
    return `/cookies?size=${COOKIE_PAGE_SIZE}&page=${pageIndex}&filter=${returnCookieFilter(
      cookieFilter,
    )}`;
  };
  // 쿠키 데이터 get
  const {
    data: cookieData,
    error,
    size: pageIndex,
    setSize: setPageIndex,
    mutate,
  } = useSWRInfinite(getKey, getApi.getAllCookieData, {
    initialData: [initAllCookieData],
    revalidateAll: false, // 항상 모든 페이지의 갱신을 시도하지 않음
    errorRetryCount: 3, // 재시도 3번까지만
  });

  // 쿠키 필터 변경
  const handleCookieFilter = (
    filter: "latest" | "readMost" | "readLeast" | "oldest" | "abc",
  ) => {
    filter !== "abc" && setCookieFilter(filter);
    // 만료일 설정, 쿠키 저장
    const expires = new Date();
    expires.setFullYear(
      expires.getFullYear() + Number(process.env.EXPIRE_YEAR),
    );
    reactCookie.save("cookieFilter", filter, {
      path: "/",
      expires,
      httpOnly: JSON.parse(HTTP_ONLY),
    });
  };

  // 검색된 쿠키 데이터 get
  const { data: searchedCookieData } = useSWR(
    "/cookies/search",
    getApi.getSearchedCookieData,
    { revalidateOnFocus: false, revalidateOnMount: false },
  );

  //쿠키 링크 복사
  const copyCookieLink = () => {
    setIsVisible({
      ...isVisible,
      copyLink: true,
    });
  };

  // 쿠키 delete
  const handleDelCookie = async (cookieId: number) => {
    mutate(async (prevDepth1) => {
      const res = await delApi.delCookieData(cookieId);
      if (prevDepth1) {
        return prevDepth1?.map((prevDepth2) => {
          if (res)
            return prevDepth2?.filter((cookie) => cookie.id !== res.cookieId);
          return prevDepth2;
        });
      }
      // initial data 일 때
      const newCookieData = initAllCookieData.filter(
        (cookie) => cookie.id !== res?.cookieId,
      );
      return [newCookieData];
    }, false);
    setIsVisible({
      ...isVisible,
      cookieDel: true,
    });
  };

  // 쿠키 edit
  /* 
  1. shouldRevalidate=true, revalidateAll=true 
  -> 수정한 쿠키의 데이터,위치 바뀜. initial 쿠키도 데이터, 위치 바로 바뀜.
  -> 그렇지만 전체 api call을 하기 때문에 인피니티 스크롤 장점이 떨어짐 
  2. shouldrevalidate=false, revalidateAll=false 
  -> 수정한 쿠키의 데이터는 바뀌는데 위치는 안바뀜. initial 쿠키의 경우 데이터, 위치 안바뀜
  3. shouldrevalidate=true, revalidateAll=false
  -> 수정한 쿠키의 데이터, 위치 안바뀜. initial 쿠키의 경우 데이터, 위치 바뀜.
  */
  const handleEditCookie = async (formData: FormData) => {
    mutate(async (prevDepth1) => {
      const res = await putApi.updateCookie(formData);
      // 갱신된 데이터일 때
      if (prevDepth1) {
        const newDepth1 = prevDepth1?.map((prevDepth2) => {
          // 최신순
          if (cookieFilter === "latest") {
            return [
              res,
              ...(prevDepth2?.filter((cookie) => cookie.id !== res.id) || []),
            ];
          }
          // 오래된순
          if (cookieFilter === "oldest") {
            return [
              ...(prevDepth2?.filter((cookie) => cookie.id !== res.id) || []),
              res,
            ];
          }
          // 그 외
          const newDepth2 = prevDepth2?.map((cookie) => {
            if (cookie.id === res.id) return res;
            return cookie;
          });
          return newDepth2;
        });
        return newDepth1;
      }

      // initial data 일 때
      // 최신순
      if (cookieFilter === "latest") {
        return [
          res,
          ...(initAllCookieData.filter((cookie) => cookie.id !== res.id) || []),
        ];
      }
      // 오래된순
      if (cookieFilter === "oldest") {
        return [
          ...(initAllCookieData.filter((cookie) => cookie.id !== res.id) || []),
          res,
        ];
      }
      // 그 외
      const newCookieData = initAllCookieData.map((cookie) => {
        if (cookie.id === res.cookieId) return res;
        return cookie;
      });
      return [newCookieData];
    }, false);
    // toast msg 띄우기
    setIsVisible({
      ...isVisible,
      cookieEdit: true,
    });
  };

  // 쿠키의 디렉토리 갱신
  const handleAddCookieToDir = async (body: PostAddCookieToDirProps) => {
    mutate(async (prevDepth1) => {
      const res = await postApi.postDirAddCookie(body);
      return prevDepth1?.map((prevDepth2) => {
        if (res)
          return prevDepth2?.map((cookie) => {
            if (cookie.id === res.cookieId) {
              return {
                ...cookie,
                directoryInfo: {
                  emoji: res?.directoryEmoji || null,
                  id: res.directoryId,
                  name: res.directoryName,
                },
              };
            }
            return cookie;
          });
        return prevDepth2;
      });
    }, true);
  };

  // 쿠키 읽은 횟수 갱신
  const handleAddCookieCount = async (id: number) => {
    mutate(async (prevDepth1) => {
      const res = await postApi.postCookieCount(id);
      return prevDepth1?.map((prevDepth2) => {
        return prevDepth2?.map((cookie) => {
          if (cookie.id === res.cookieId) {
            return {
              ...cookie,
              readCnt: res.readCnt,
            };
          }
          return cookie;
        });
      });
    }, true);
  };

  return {
    cookieFilter, // 쿠키의 필터 타입
    handleCookieFilter, // 쿠키 필터링 변경
    cookieData, // 쿠키 데이터(이중배열)
    pageIndex, // 인피니티 스크롤 pageIndex
    setPageIndex,
    searchedCookieData, // 검색된 쿠키 데이터(배열)
    copyCookieLink, // 쿠키 링크 복사
    handleDelCookie, // 쿠키 삭제
    handleEditCookie, // 쿠키 갱신
    handleAddCookieToDir, // 쿠키 디렉토리 변경
    handleAddCookieCount, // 쿠키 읽은 횟수 갱신
    isError: error,
    isLoading: !cookieData && !error,
  };
};

export default CookieModule;
