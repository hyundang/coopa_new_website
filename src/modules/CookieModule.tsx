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
import GetSiteData from "@lib/GetSiteData";
import reactCookie from "react-cookies";
import { useState } from "react";
import useSWR, { useSWRInfinite } from "swr";
import { useRecoilState } from "recoil";
// modules
import { ToastMsgState } from "./states";

interface CookieModuleProps {
  type: "newtab" | "dirDetail" | "dirShared";
  dirId?: number;
  initAllUnpinnedCookieData: CookieDataProps[];
  initAllPinnedCookieData: CookieDataProps[];
}
const CookieModule = ({
  type,
  dirId = -1,
  initAllUnpinnedCookieData,
  initAllPinnedCookieData,
}: CookieModuleProps) => {
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

  // 일반 쿠키 데이터 key 함수
  const getUnpinnedCookieSWRKey = (
    pageIndex: number,
    previousPageData: any,
  ) => {
    if (previousPageData && !previousPageData.length) return null; // 끝에 도달
    // 뉴탭 쿠키
    if (type === "newtab") {
      return `/cookies?size=${COOKIE_PAGE_SIZE}&page=${pageIndex}&filter=${returnCookieFilter(
        cookieFilter,
      )}`;
    }
    // 디렉토리 상세 쿠키
    if (type === "dirDetail") {
      return `/directories/${dirId}/unpinned/cookies?size=${COOKIE_PAGE_SIZE}&page=${pageIndex}&filter=${returnCookieFilter(
        cookieFilter,
      )}`;
    }
    // 공유된 디렉토리 상세 쿠키
    return `/share/${dirId}/cookies?size=${COOKIE_PAGE_SIZE}&page=${pageIndex}&filter=${returnCookieFilter(
      cookieFilter,
    )}`;
  };

  // 일반 쿠키 데이터 get
  const {
    data: unpinnedCookieData,
    error: unpinnedError,
    size: unpinnedPageIndex,
    setSize: setUnpinnedPageIndex,
    mutate: unpinnedMutate,
  } = useSWRInfinite(getUnpinnedCookieSWRKey, getApi.getAllCookieData, {
    initialData: [initAllUnpinnedCookieData],
    revalidateAll: false, // 항상 모든 페이지의 갱신을 시도하지 않음
    errorRetryCount: 3, // 재시도 3번까지만
  });

  const getPinnedCookieSwRKey = () => {
    // 뉴탭 쿠키
    if (type === "newtab") return `/cookies/pinned`;
    // 디렉토리 상세 쿠키
    return `/directories/${dirId}/pinned/cookies`;
  };
  // 고정 쿠키 데이터 get
  const {
    data: pinnedCookieData,
    error: pinnedError,
    mutate: pinnedMutate,
  } = useSWR(getPinnedCookieSwRKey, getApi.getAllCookieData, {
    initialData: initAllPinnedCookieData,
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
  const { data: searchedCookieData, mutate: searchedMutate } = useSWR(
    "/cookies/search",
    getApi.getSearchedCookieData,
    { revalidateOnFocus: false, revalidateOnMount: false },
  );

  // 쿠키 링크 복사
  const copyCookieLink = () => {
    setIsToastMsgVisible({
      ...isToastMsgVisible,
      copyLink: true,
    });
  };

  // 쿠키 삭제
  const filterSpecificCookieInCookieList = (
    cookieList: CookieDataProps[],
    cookieId: number,
  ): CookieDataProps[] => {
    return cookieList.filter((cookie) => cookie.id !== cookieId);
  };

  const filterSpecificCookieIn2DCookieList = (
    outerCookieList: (CookieDataProps[] | undefined)[] | undefined,
    cookieId: number,
  ): CookieDataProps[][] => {
    if (outerCookieList) {
      const newCookieList = outerCookieList.map((innerCookieList) => {
        if (innerCookieList)
          return filterSpecificCookieInCookieList(innerCookieList, cookieId);
        return [];
      });
      return newCookieList;
    }
    // initial data 일 때
    const newCookieList = filterSpecificCookieInCookieList(
      initAllUnpinnedCookieData,
      cookieId,
    );
    return [newCookieList];
  };

  const deleteCookie = async (
    cookieId: number,
    isPinned: boolean,
    isSearched: boolean,
  ) => {
    const res = await delApi.delCookieData(cookieId);
    if (res) {
      if (isPinned)
        pinnedMutate(
          (cookieList) =>
            filterSpecificCookieInCookieList(cookieList || [], cookieId),
          false,
        );
      else if (isSearched)
        searchedMutate(async (cookieList) => {
          return filterSpecificCookieInCookieList(cookieList || [], cookieId);
        }, false);
      else {
        unpinnedMutate(
          (outerCookieList) =>
            filterSpecificCookieIn2DCookieList(outerCookieList, res.cookieId),
          false,
        );
      }
      setIsToastMsgVisible({
        ...isToastMsgVisible,
        cookieDel: true,
      });
      return;
    }
    alert("쿠키 삭제 실패");
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
  const changeSequenceOfSpecificCookieInCookieList = (
    cookieList: CookieDataProps[],
    cookieData: CookieDataProps,
  ): CookieDataProps[] => {
    switch (cookieFilter) {
      case "latest":
        return [
          cookieData,
          ...filterSpecificCookieInCookieList(cookieList, cookieData.id),
        ];
      case "oldest":
        return [
          ...filterSpecificCookieInCookieList(cookieList, cookieData.id),
          cookieData,
        ];
      default:
        return cookieList.map((cookie) => {
          if (cookie.id === cookieData.id) return cookieData;
          return cookie;
        });
    }
  };

  const changeSequenceOfSpecificCookieIn2DCookieList = (
    outerCookieList: (CookieDataProps[] | undefined)[] | undefined,
    editedCookieData: CookieDataProps,
  ): CookieDataProps[][] => {
    // 갱신된 데이터일 때
    if (outerCookieList) {
      const newOuterCookieList = outerCookieList.map((innerCookieList) => {
        if (innerCookieList) {
          const newInnerCookieList = changeSequenceOfSpecificCookieInCookieList(
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
    const newInnerCookieList = changeSequenceOfSpecificCookieInCookieList(
      initAllUnpinnedCookieData,
      editedCookieData,
    );
    return [newInnerCookieList];
  };

  const editCookie = async (
    formData: FormData,
    isPinned: boolean,
    isSearched: boolean,
  ) => {
    setIsEditCookieLoading(true);
    const res = await putApi.updateCookie(formData);
    if (res) {
      if (isPinned)
        pinnedMutate(
          (cookieList) =>
            changeSequenceOfSpecificCookieInCookieList(cookieList || [], res),
          false,
        );
      else if (isSearched)
        searchedMutate((cookieList) => {
          return cookieList?.map((cookie) => {
            if (cookie.id === res.id) return res;
            return cookie;
          });
        }, false);
      else
        unpinnedMutate(
          (outerCookieList) =>
            changeSequenceOfSpecificCookieIn2DCookieList(outerCookieList, res),
          false,
        );
      setIsEditCookieLoading(false);
      setIsToastMsgVisible({
        ...isToastMsgVisible,
        cookieEdit: true,
      });
      return;
    }
    setIsEditCookieLoading(false);
    alert("쿠키 수정 실패");
  };

  // 쿠키의 디렉토리 변경
  function isTypeOfObjectEqualPostCookieToDirResponseProps(
    resData: any,
  ): resData is PostCookieToDirResponseProps {
    return true;
  }

  const ChangeDataOfSpecificCookieInCookieList = (
    cookieList: CookieDataProps[],
    cookieData: PostCookieToDirResponseProps | PostReadCntResponseProps,
  ) => {
    return cookieList.map((cookie) => {
      if (cookie.id === cookieData.cookieId) {
        if (isTypeOfObjectEqualPostCookieToDirResponseProps(cookieData))
          return {
            ...cookie,
            directoryInfo: {
              emoji: cookieData.directoryEmoji || null,
              id: cookieData.directoryId,
              name: cookieData.directoryName,
            },
          };
        return {
          ...cookie,
          readCnt: cookieData.readCnt,
        };
      }
      return cookie;
    });
  };

  const ChangeDataOfSpecificCookieIn2DCookieList = (
    outerCookieList: (CookieDataProps[] | undefined)[] | undefined,
    cookieData: PostCookieToDirResponseProps | PostReadCntResponseProps,
  ) => {
    if (outerCookieList) {
      const newOuterCookieList = outerCookieList.map((innerCookieList) => {
        const newInnerCookieList = ChangeDataOfSpecificCookieInCookieList(
          innerCookieList || [],
          cookieData,
        );
        return newInnerCookieList;
      });
      return newOuterCookieList;
    }
    // initial data 일 때
    const newInnerCookieList = ChangeDataOfSpecificCookieInCookieList(
      initAllUnpinnedCookieData,
      cookieData,
    );
    return [newInnerCookieList];
  };

  const changeDirOfCookie = async (
    body: PostCookieToDirProps,
    isPinned: boolean,
    isSearched: boolean,
  ) => {
    const res = await postApi.postCookieToDir(body);
    if (res) {
      if (isPinned)
        pinnedMutate(
          (cookieList) =>
            ChangeDataOfSpecificCookieInCookieList(cookieList || [], res),
          true,
        );
      else if (isSearched)
        searchedMutate(
          (cookieList) =>
            ChangeDataOfSpecificCookieInCookieList(cookieList || [], res),
          false,
        );
      else
        unpinnedMutate(
          (outerCookieList) =>
            ChangeDataOfSpecificCookieIn2DCookieList(outerCookieList, res),
          true,
        );
      return;
    }
    alert("디렉토리 변경 실패");
  };

  // 쿠키 읽은 횟수 갱신
  const editCookieReadCount = async (
    cookieId: number,
    isPinned: boolean,
    isSearched: boolean,
  ) => {
    const res = await postApi.postCookieReadCount(cookieId);
    if (res) {
      if (isPinned)
        pinnedMutate(
          (cookieList) =>
            ChangeDataOfSpecificCookieInCookieList(cookieList || [], res),
          true,
        );
      else if (isSearched)
        searchedMutate(
          (cookieList) =>
            ChangeDataOfSpecificCookieInCookieList(cookieList || [], res),
          false,
        );
      else
        unpinnedMutate(
          (outerCookieList) =>
            ChangeDataOfSpecificCookieIn2DCookieList(outerCookieList, res),
          true,
        );
      return;
    }
    alert("쿠키 읽기 실패");
  };

  // 쿠키 고정
  const editCookieIsPinned = async (
    cookieId: number,
    isPinned: boolean,
    isSearched: boolean,
  ) => {
    const res = await putApi.updateCookiePin(cookieId, !isPinned);
    if (res) {
      if (!isPinned) {
        pinnedMutate(async (cookieList) => {
          return changeSequenceOfSpecificCookieInCookieList(
            cookieList || [],
            res,
          );
        }, false);
        unpinnedMutate(async (outerCookieList) => {
          return filterSpecificCookieIn2DCookieList(outerCookieList, cookieId);
        }, false);
      } else if (isSearched) {
        searchedMutate(async (cookieList) => {
          return cookieList?.map((cookie) => {
            if (cookie.id === cookieId) return res;
            return cookie;
          });
        });
      } else {
        pinnedMutate(async (cookieList) => {
          return filterSpecificCookieInCookieList(cookieList || [], cookieId);
        }, false);
        unpinnedMutate(async (outerCookieList) => {
          return changeSequenceOfSpecificCookieIn2DCookieList(
            outerCookieList,
            res,
          );
        }, false);
      }
      return;
    }
    setIsToastMsgVisible({
      ...isToastMsgVisible,
      pinnedSizeOver: true,
    });
  };

  // 쿠키 추가
  const createCookie = async (
    url: string,
    isDirDetail: boolean,
    directoryId: number | undefined,
  ): Promise<boolean> => {
    const res = await GetSiteData(url);
    if (res) {
      if (isDirDetail && directoryId) {
        await changeDirOfCookie(
          {
            directoryId,
            cookieId: res.id,
          },
          false,
          false,
        );
      } else {
        unpinnedMutate(
          (outerCookieList) => filterEditedCookie(outerCookieList, res),
          false,
        );
      }
      return true;
    }
    alert("쿠키 추가 실패!");
    return false;
  };

  return {
    cookieFilter,
    changeAndSaveCookieFilter,
    pinnedCookieData,
    unpinnedCookieData,
    unpinnedPageIndex,
    setUnpinnedPageIndex,
    searchedCookieData, // 검색된 쿠키 데이터(배열)
    copyCookieLink,
    deleteCookie,
    editCookie,
    changeDirOfCookie,
    editCookieReadCount,
    isError: pinnedError && unpinnedError,
    isLoading:
      !pinnedCookieData &&
      !pinnedError &&
      !unpinnedCookieData &&
      !unpinnedError,
    isEditCookieLoading,
    setIsEditCookieLoading,
    editCookieIsPinned,
    createCookie,
  };
};

export default CookieModule;
