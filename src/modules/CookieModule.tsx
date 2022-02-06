// apis
import { getApi, delApi, putApi, postApi } from "@api/index";
// interfaces
import { CookieDataProps, UpdateCookieProps } from "@interfaces/cookie";
import {
  CreateCookieToDirProps,
  CreateCookieToDirResProps,
  CreateReadCntResProps,
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
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

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
    if (type === "newtab")
      return `/cookies/pinned?filter=${returnCookieFilter(cookieFilter)}`;
    // 디렉토리 상세 쿠키
    return `/directories/${dirId}/pinned/cookies?filter=${returnCookieFilter(
      cookieFilter,
    )}`;
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
  const updateAndSaveCookieFilter = (
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

  const filterSpecificCookieInCookieList = (
    cookieList: CookieDataProps[],
    cookieId: number,
  ): CookieDataProps[] => {
    return cookieList.filter((cookie) => cookie.id !== cookieId);
  };

  const filterSpecificCookieIn2DCookieList = (
    outerCookieList: (CookieDataProps[] | undefined)[],
    cookieId: number,
  ): CookieDataProps[][] => {
    const newCookieList = outerCookieList.map((innerCookieList) => {
      return filterSpecificCookieInCookieList(innerCookieList || [], cookieId);
    });
    return newCookieList;
  };

  const filterSpecificUnpinnedCookie = (
    outerCookieList: (CookieDataProps[] | undefined)[] | undefined,
    cookieId: number,
  ): CookieDataProps[][] => {
    if (outerCookieList) {
      return filterSpecificCookieIn2DCookieList(outerCookieList, cookieId);
    }
    // initial data 일 때
    return [
      filterSpecificCookieInCookieList(initAllUnpinnedCookieData, cookieId),
    ];
  };

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
      default:
        return cookieList.map((cookie) => {
          if (cookie.id === cookieData.id) return cookieData;
          return cookie;
        });
    }
  };

  const changeSequenceOfSpecificCookieIn2DCookieList = (
    outerCookieList: (CookieDataProps[] | undefined)[],
    cookieData: CookieDataProps,
  ): CookieDataProps[][] => {
    let newOuterCookieList: CookieDataProps[][];
    switch (cookieFilter) {
      case "latest":
        newOuterCookieList = outerCookieList.map((innerCookieList, idx) => {
          if (idx === 0)
            return changeSequenceOfSpecificCookieInCookieList(
              innerCookieList || [],
              cookieData,
            );
          return innerCookieList || [];
        });
        break;
      default:
        newOuterCookieList = outerCookieList.map((innerCookieList) => {
          return changeSequenceOfSpecificCookieInCookieList(
            innerCookieList || [],
            cookieData,
          );
        });
        break;
    }
    return newOuterCookieList;
  };

  const changeSequenceOfSpecificUnpinnedCookie = (
    outerCookieList: (CookieDataProps[] | undefined)[] | undefined,
    cookieData: CookieDataProps,
  ): CookieDataProps[][] => {
    if (outerCookieList) {
      return changeSequenceOfSpecificCookieIn2DCookieList(
        outerCookieList,
        cookieData,
      );
    }
    // initial data 일 때
    return [
      changeSequenceOfSpecificCookieInCookieList(
        initAllUnpinnedCookieData,
        cookieData,
      ),
    ];
  };

  function isTypeOfObjectEqualCreateCookieToDirResProps(
    _resData: any,
  ): _resData is CreateCookieToDirResProps {
    return true;
  }

  const changeDataOfSpecificCookieInCookieList = (
    cookieList: CookieDataProps[],
    cookieData: CreateCookieToDirResProps | CreateReadCntResProps,
  ): CookieDataProps[] => {
    return cookieList.map((cookie) => {
      if (cookie.id === cookieData.cookieId) {
        if (isTypeOfObjectEqualCreateCookieToDirResProps(cookieData))
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

  const changeDataOfSpecificCookieIn2DCookieList = (
    outerCookieList: (CookieDataProps[] | undefined)[],
    cookieData: CreateCookieToDirResProps | CreateReadCntResProps,
  ): CookieDataProps[][] => {
    const newOuterCookieList = outerCookieList.map((innerCookieList) => {
      return changeDataOfSpecificCookieInCookieList(
        innerCookieList || [],
        cookieData,
      );
    });
    return newOuterCookieList;
  };

  const changeDatafSpecificUnpinnedCookie = (
    outerCookieList: (CookieDataProps[] | undefined)[] | undefined,
    cookieData: CreateCookieToDirResProps | CreateReadCntResProps,
  ): CookieDataProps[][] => {
    if (outerCookieList) {
      return changeDataOfSpecificCookieIn2DCookieList(
        outerCookieList,
        cookieData,
      );
    }
    // initial data 일 때
    return [
      changeDataOfSpecificCookieInCookieList(
        initAllUnpinnedCookieData,
        cookieData,
      ),
    ];
  };

  // 쿠키 링크 복사
  const copyCookieLink = () => {
    setIsToastMsgVisible({
      ...isToastMsgVisible,
      copyLink: true,
    });
  };

  // 쿠키 생성
  const createCookie = async (
    url: string,
    isDirDetail: boolean,
    directoryId: number | undefined,
  ): Promise<boolean> => {
    const res = await GetSiteData(url);
    if (res) {
      if (isDirDetail && directoryId) {
        await updateDirOfCookie(
          {
            directoryId,
            cookieId: res.id,
          },
          false,
          false,
        );
      }
      if (cookieFilter === "latest") {
        unpinnedMutate(
          (outerCookieList) =>
            changeSequenceOfSpecificUnpinnedCookie(outerCookieList, res),
          false,
        );
      } else {
        await unpinnedMutate();
      }
      return true;
    }
    alert("쿠키 추가 실패!");
    return false;
  };

  // 쿠키 삭제
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
            filterSpecificCookieInCookieList(
              cookieList || initAllPinnedCookieData,
              cookieId,
            ),
          false,
        );
      else if (isSearched)
        searchedMutate((cookieList) => {
          return filterSpecificCookieInCookieList(cookieList || [], cookieId);
        }, false);
      else {
        unpinnedMutate(
          (outerCookieList) =>
            filterSpecificUnpinnedCookie(outerCookieList, res.cookieId),
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
  const convertDataToFormData = (updatedData: UpdateCookieProps): FormData => {
    const formData = new FormData();
    formData.append("cookieId", String(updatedData.cookieId));
    updatedData?.image && formData.append("image", updatedData.image);
    formData.append("title", updatedData.title);
    formData.append("content", updatedData.content);
    return formData;
  };

  const updateCookie = async (
    updatedData: UpdateCookieProps,
    isPinned: boolean,
    isSearched: boolean,
  ) => {
    setIsUpdateLoading(true);
    const formData = convertDataToFormData(updatedData);
    const res = await putApi.updateCookie(formData);
    if (res) {
      if (isPinned)
        pinnedMutate(
          (cookieList) =>
            changeSequenceOfSpecificCookieInCookieList(
              cookieList || initAllPinnedCookieData,
              res,
            ),
          false,
        );
      else if (isSearched)
        searchedMutate((cookieList) => {
          return cookieList?.map((cookie) => {
            if (cookie.id === res.id) return res;
            return cookie;
          });
        }, false);
      else if (cookieFilter !== "oldest")
        unpinnedMutate(
          (outerCookieList) =>
            changeSequenceOfSpecificUnpinnedCookie(outerCookieList, res),
          false,
        );
      else await unpinnedMutate();

      setIsUpdateLoading(false);
      setIsToastMsgVisible({
        ...isToastMsgVisible,
        cookieEdit: true,
      });
      return;
    }
    setIsUpdateLoading(false);
    alert("쿠키 수정 실패");
  };

  // 쿠키의 디렉토리 변경
  const updateDirOfCookie = async (
    body: CreateCookieToDirProps,
    isPinned: boolean,
    isSearched: boolean,
  ) => {
    setIsUpdateLoading(true);
    const res = await postApi.postCookieToDir(body);
    if (res) {
      if (isPinned)
        pinnedMutate(
          (cookieList) =>
            changeDataOfSpecificCookieInCookieList(
              cookieList || initAllPinnedCookieData,
              res,
            ),
          true,
        );
      else if (isSearched)
        searchedMutate(
          (cookieList) =>
            changeDataOfSpecificCookieInCookieList(cookieList || [], res),
          false,
        );
      else if (cookieFilter !== "oldest")
        unpinnedMutate(
          (outerCookieList) =>
            changeDatafSpecificUnpinnedCookie(outerCookieList, res),
          false,
        );
      else await unpinnedMutate();
      setIsUpdateLoading(true);
      return res;
    }
    alert("디렉토리 변경 실패");
  };

  // 쿠키 읽은 횟수 갱신
  const updateCookieReadCnt = async (
    cookieId: number,
    isPinned: boolean,
    isSearched: boolean,
  ) => {
    const res = await postApi.postCookieReadCount(cookieId);
    if (res) {
      if (isPinned)
        pinnedMutate(
          (cookieList) =>
            changeDataOfSpecificCookieInCookieList(
              cookieList || initAllPinnedCookieData,
              res,
            ),
          true,
        );
      else if (isSearched)
        searchedMutate(
          (cookieList) =>
            changeDataOfSpecificCookieInCookieList(cookieList || [], res),
          false,
        );
      else
        unpinnedMutate(
          (outerCookieList) =>
            changeDatafSpecificUnpinnedCookie(outerCookieList, res),
          true,
        );
      return;
    }
    alert("쿠키 읽기 실패");
  };

  // 쿠키 고정
  const updateCookiePin = async (
    cookieId: number,
    isPinned: boolean,
    isSearched: boolean,
  ): Promise<boolean> => {
    setIsUpdateLoading(true);
    const res = await putApi.updateCookiePin(cookieId, !isPinned);
    if (res) {
      if (!isPinned) {
        if (cookieFilter === "latest" || cookieFilter === "oldest") {
          pinnedMutate((cookieList) => {
            return changeSequenceOfSpecificCookieInCookieList(
              cookieList || initAllPinnedCookieData,
              res,
            );
          }, false);
        } else {
          await pinnedMutate();
        }
        unpinnedMutate((outerCookieList) => {
          return filterSpecificUnpinnedCookie(outerCookieList, cookieId);
        }, false);
      } else if (isSearched) {
        searchedMutate((cookieList) => {
          return cookieList?.map((cookie) => {
            if (cookie.id === cookieId) return res;
            return cookie;
          });
        });
      } else {
        pinnedMutate((cookieList) => {
          const filteredCookieList = filterSpecificCookieInCookieList(
            cookieList || initAllPinnedCookieData,
            cookieId,
          );
          return filteredCookieList;
        }, false);
        if (cookieFilter === "latest") {
          unpinnedMutate((outerCookieList) => {
            console.log(outerCookieList);
            return changeSequenceOfSpecificUnpinnedCookie(outerCookieList, res);
          }, false);
        } else {
          await unpinnedMutate();
        }
      }
      setIsUpdateLoading(false);
      return true;
    }
    setIsToastMsgVisible({
      ...isToastMsgVisible,
      pinnedSizeOver: true,
    });
    return false;
  };

  const refreshCookie = () => {
    pinnedMutate();
    unpinnedMutate();
  };

  return {
    isError: pinnedError || unpinnedError,
    isLoading:
      !pinnedCookieData &&
      !pinnedError &&
      !unpinnedCookieData &&
      !unpinnedError,
    cookieFilter,
    updateAndSaveCookieFilter,
    pinnedCookieData,
    unpinnedCookieData,
    unpinnedPageIndex,
    setUnpinnedPageIndex,
    searchedCookieData,
    copyCookieLink,
    createCookie,
    deleteCookie,
    updateCookie,
    isUpdateLoading,
    setIsUpdateLoading,
    updateDirOfCookie,
    updateCookieReadCnt,
    updateCookiePin,
    refreshCookie,
  };
};

export default CookieModule;
