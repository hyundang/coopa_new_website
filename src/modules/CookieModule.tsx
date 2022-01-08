// apis
import { getApi, delApi, putApi, postApi } from "@api/index";
// interfaces
import { CookieDataProps } from "@interfaces/cookie";
import {
  PostCookieToDirProps,
  PostCookieToDirResponseProps,
  PostReadCntResponseProps,
} from "@interfaces/directory";
// libs
import { returnCookieFilter } from "@lib/filter";
import SaveDataInWebCookie from "@lib/SaveDataInWebCookie";
import reactCookie from "react-cookies";
import { useState } from "react";
import useSWR, { useSWRInfinite } from "swr";
import { useRecoilState } from "recoil";
// modules
import { ToastMsgState } from "./states";

interface CookieModuleProps {
  initAllCookieData: CookieDataProps[];
}
const CookieModule = ({ initAllCookieData }: CookieModuleProps) => {
  // toast msg
  const [isToastMsgVisible, setIsToastMsgVisible] =
    useRecoilState(ToastMsgState);
  // 쿠키 필터
  const initCookieFilter = reactCookie.load("cookieFilter");
  const [cookieFilter, setCookieFilter] = useState<
    "latest" | "readMost" | "readLeast" | "oldest"
  >(initCookieFilter || "latest");
  // 쿠키 수정 로딩
  const [isEditCookieLoading, setIsEditCookieLoading] = useState(false);

  // 쿠키 데이터 key 함수
  const getCookieSWRKey = (pageIndex: number, previousPageData: any) => {
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
  } = useSWRInfinite(getCookieSWRKey, getApi.getAllCookieData, {
    initialData: [initAllCookieData],
    revalidateAll: false, // 항상 모든 페이지의 갱신을 시도하지 않음
    errorRetryCount: 3, // 재시도 3번까지만
  });

  // 쿠키 필터 변경
  const changeAndSaveCookieFilter = (
    filter: "latest" | "readMost" | "readLeast" | "oldest" | "abc",
  ) => {
    filter !== "abc" && setCookieFilter(filter);
    SaveDataInWebCookie("cookieFilter", filter);
  };

  // 검색된 쿠키 데이터 get
  const { data: searchedCookieData } = useSWR(
    "/cookies/search",
    getApi.getSearchedCookieData,
    { revalidateOnFocus: false, revalidateOnMount: false },
  );

  //쿠키 링크 복사
  const copyCookieLink = () => {
    setIsToastMsgVisible({
      ...isToastMsgVisible,
      copyLink: true,
    });
  };

  // 쿠키 삭제
  const deleteCookie = async (cookieId: number) => {
    mutate(async (outerCookieList) => {
      const res = await delApi.delCookieData(cookieId);
      if (res) return filterDeletedCookie(outerCookieList, res.cookieId);
      alert("쿠키 삭제 실패");
    }, false);

    setIsToastMsgVisible({
      ...isToastMsgVisible,
      cookieDel: true,
    });
  };

  const filterDeletedCookie = (
    outerCookieList: (CookieDataProps[] | undefined)[] | undefined,
    cookieId: number,
  ): CookieDataProps[][] => {
    if (outerCookieList) {
      const newCookieList = outerCookieList.map((innerCookieList) => {
        if (innerCookieList)
          return innerCookieList.filter((cookie) => cookie.id !== cookieId);
        return [];
      });
      return newCookieList;
    }
    // initial data 일 때
    const newCookieList = initAllCookieData.filter(
      (cookie) => cookie.id !== cookieId,
    );
    return [newCookieList];
  };

  // 쿠키 edit
  const editCookie = async (formData: FormData) => {
    setIsEditCookieLoading(true);

    mutate(async (outerCookieList) => {
      const res = await putApi.updateCookie(formData);
      if (res) return filterEditedCookie(outerCookieList, res);
      alert("쿠키 수정 실패");
    }, false);

    setIsEditCookieLoading(false);
    setIsToastMsgVisible({
      ...isToastMsgVisible,
      cookieEdit: true,
    });
  };

  /* 
  1. shouldRevalidate=true, revalidateAll=true 
  -> 수정한 쿠키의 데이터,위치 바뀜. initial 쿠키도 데이터, 위치 바로 바뀜.
  -> 그렇지만 전체 api call을 하기 때문에 인피니티 스크롤 장점이 떨어짐 
  2. shouldrevalidate=false, revalidateAll=false 
  -> 수정한 쿠키의 데이터는 바뀌는데 위치는 안바뀜. initial 쿠키의 경우 데이터, 위치 안바뀜
  3. shouldrevalidate=true, revalidateAll=false
  -> 수정한 쿠키의 데이터, 위치 안바뀜. initial 쿠키의 경우 데이터, 위치 바뀜.
  */
  const changeSequenceOfEditedCookieByFiltering = (
    cookieList: CookieDataProps[],
    editedCookieData: CookieDataProps,
  ): CookieDataProps[] => {
    switch (cookieFilter) {
      case "latest":
        return [
          editedCookieData,
          ...cookieList.filter((cookie) => cookie.id !== editedCookieData.id),
        ];
      case "oldest":
        return [
          ...cookieList.filter((cookie) => cookie.id !== editedCookieData.id),
          editedCookieData,
        ];
      default:
        return cookieList.map((cookie) => {
          if (cookie.id === editedCookieData.id) return editedCookieData;
          return cookie;
        });
    }
  };

  const filterEditedCookie = (
    outerCookieList: (CookieDataProps[] | undefined)[] | undefined,
    editedCookieData: CookieDataProps,
  ): CookieDataProps[][] => {
    // 갱신된 데이터일 때
    if (outerCookieList) {
      const newOuterCookieList = outerCookieList.map((innerCookieList) => {
        if (innerCookieList) {
          const newInnerCookieList = changeSequenceOfEditedCookieByFiltering(
            innerCookieList,
            editedCookieData,
          );
          return newInnerCookieList;
        }
        return [];
      });
      return newOuterCookieList;
    }
    // initial data 일 때
    const newInnerCookieList = changeSequenceOfEditedCookieByFiltering(
      initAllCookieData,
      editedCookieData,
    );
    return [newInnerCookieList];
  };

  function isTypeOfObjectEqualsToPostCookieToDirResponseProps(
    resData: any,
  ): resData is PostCookieToDirResponseProps {
    return true;
  }

  const filterAndChangeDataOfEditedCookie = (
    outerCookieList: (CookieDataProps[] | undefined)[],
    editedCookieData: PostCookieToDirResponseProps | PostReadCntResponseProps,
  ) => {
    const newOuterCookieList = outerCookieList.map((innerCookieList) => {
      const newInnerCookieList = innerCookieList?.map((cookie) => {
        if (cookie.id === editedCookieData.cookieId) {
          if (
            isTypeOfObjectEqualsToPostCookieToDirResponseProps(editedCookieData)
          )
            return {
              ...cookie,
              directoryInfo: {
                emoji: editedCookieData.directoryEmoji || null,
                id: editedCookieData.directoryId,
                name: editedCookieData.directoryName,
              },
            };
          return {
            ...cookie,
            readCnt: editedCookieData.readCnt,
          };
        }
        return cookie;
      });
      return newInnerCookieList;
    });
    return newOuterCookieList;
  };

  // 쿠키의 디렉토리 변경
  const changeDirOfCookie = async (body: PostCookieToDirProps) => {
    mutate(async (outerCookieList) => {
      const res = await postApi.postCookieToDir(body);
      if (res && outerCookieList)
        return filterAndChangeDataOfEditedCookie(outerCookieList, res);
      alert("디렉토리 변경 실패");
    }, true);
  };

  // 쿠키 읽은 횟수 갱신
  const editCookieReadCount = async (id: number) => {
    mutate(async (outerCookieList) => {
      const res = await postApi.postCookieReadCount(id);
      if (res && outerCookieList)
        return filterAndChangeDataOfEditedCookie(outerCookieList, res);
      alert("쿠키 읽기 실패");
    }, true);
  };

  return {
    cookieFilter,
    changeAndSaveCookieFilter,
    cookieData, // 쿠키 데이터(이중배열)
    pageIndex, // 인피니티 스크롤 pageIndex
    setPageIndex,
    searchedCookieData, // 검색된 쿠키 데이터(배열)
    copyCookieLink,
    deleteCookie,
    editCookie,
    changeDirOfCookie,
    editCookieReadCount,
    isError: error,
    isLoading: !cookieData && !error,
    isEditCookieLoading,
    setIsEditCookieLoading,
  };
};

export default CookieModule;
