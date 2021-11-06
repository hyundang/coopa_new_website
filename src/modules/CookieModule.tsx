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
    if (previousPageData && !previousPageData.length) return null; // 끝에 도달
    return `/cookies?size=${COOKIE_PAGE_SIZE}&page=${pageIndex}`;
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
    // initialSize: 1, // 초기에 로드하는 pageIndex size?
    revalidateAll: false, // 항상 모든 페이지의 갱신을 시도하지 않음
    onErrorRetry: ({ retryCount }) => {
      // 3번 까지만 재시도함
      if (retryCount >= 3) return undefined;
      return true;
    },
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
    // 필터에 따른 쿠키 데이터 재요청
    /* 코드 추가하기
     *
     */
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
      return prevDepth1?.map((prevDepth2) => {
        if (res)
          return prevDepth2?.filter((cookie) => cookie.id !== res.cookieId);
        return prevDepth2;
      });
    }, false);
    setIsVisible({
      ...isVisible,
      cookieDel: true,
    });
  };

  // 쿠키 edit
  const handleEditCookie = async (formData: FormData) => {
    mutate(async (prevDepth1) => {
      const res = await putApi.updateCookie(formData);
      return prevDepth1?.map((prevDepth2) => {
        if (res)
          return prevDepth2?.map((cookie) => {
            if (cookie.id === res.cookieId) {
              return {
                ...cookie,
                content: res.content,
                thumbnail: res.thumbnail,
                title: res.title,
              };
            }
            return cookie;
          });
        return prevDepth2;
      });
    }, true);
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
