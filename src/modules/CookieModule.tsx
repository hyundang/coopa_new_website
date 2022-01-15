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
  const filterSpecificCookie = (
    cookieList: CookieDataProps[],
    cookieId: number,
  ): CookieDataProps[] => {
    return cookieList.filter((cookie) => cookie.id !== cookieId);
  };

  const filterDeletedCookie = (
    outerCookieList: (CookieDataProps[] | undefined)[] | undefined,
    cookieId: number,
  ): CookieDataProps[][] => {
    if (outerCookieList) {
      const newCookieList = outerCookieList.map((innerCookieList) => {
        if (innerCookieList)
          return filterSpecificCookie(innerCookieList, cookieId);
        return [];
      });
      return newCookieList;
    }
    // initial data 일 때
    const newCookieList = filterSpecificCookie(
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
          (cookieList) => filterSpecificCookie(cookieList || [], cookieId),
          false,
        );
      else if (isSearched)
        searchedMutate(async (cookieList) => {
          return filterSpecificCookie(cookieList || [], cookieId);
        }, false);
      else {
        unpinnedMutate(
          (outerCookieList) =>
            filterDeletedCookie(outerCookieList, res.cookieId),
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
  const changeSequenceOfEditedCookieByFiltering = (
    cookieList: CookieDataProps[],
    editedCookieData: CookieDataProps,
  ): CookieDataProps[] => {
    switch (cookieFilter) {
      case "latest":
        return [
          editedCookieData,
          ...filterSpecificCookie(cookieList, editedCookieData.id),
        ];
      case "oldest":
        return [
          ...filterSpecificCookie(cookieList, editedCookieData.id),
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
            changeSequenceOfEditedCookieByFiltering(cookieList || [], res),
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
          (outerCookieList) => filterEditedCookie(outerCookieList, res),
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
  function isTypeOfObjectEqualsToPostCookieToDirResponseProps(
    resData: any,
  ): resData is PostCookieToDirResponseProps {
    return true;
  }

  const filterAndChangeDataOfEditedCookie = (
    cookieList: CookieDataProps[],
    editedCookieData: PostCookieToDirResponseProps | PostReadCntResponseProps,
  ) => {
    return cookieList.map((cookie) => {
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
  };

  const filterOuterEditedCookie = (
    outerCookieList: (CookieDataProps[] | undefined)[] | undefined,
    editedCookieData: PostCookieToDirResponseProps | PostReadCntResponseProps,
  ) => {
    if (outerCookieList) {
      const newOuterCookieList = outerCookieList.map((innerCookieList) => {
        const newInnerCookieList = filterAndChangeDataOfEditedCookie(
          innerCookieList || [],
          editedCookieData,
        );
        return newInnerCookieList;
      });
      return newOuterCookieList;
    }
    // initial data 일 때
    const newInnerCookieList = filterAndChangeDataOfEditedCookie(
      initAllUnpinnedCookieData,
      editedCookieData,
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
            filterAndChangeDataOfEditedCookie(cookieList || [], res),
          true,
        );
      else if (isSearched)
        searchedMutate(
          (cookieList) =>
            filterAndChangeDataOfEditedCookie(cookieList || [], res),
          false,
        );
      else
        unpinnedMutate(
          (outerCookieList) => filterOuterEditedCookie(outerCookieList, res),
          true,
        );

      return res;
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
            filterAndChangeDataOfEditedCookie(cookieList || [], res),
          true,
        );
      else if (isSearched)
        searchedMutate(
          (cookieList) =>
            filterAndChangeDataOfEditedCookie(cookieList || [], res),
          false,
        );
      else
        unpinnedMutate(
          (outerCookieList) => filterOuterEditedCookie(outerCookieList, res),
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
          return changeSequenceOfEditedCookieByFiltering(cookieList || [], res);
        }, false);
        unpinnedMutate(async (outerCookieList) => {
          return filterDeletedCookie(outerCookieList, cookieId);
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
          return filterSpecificCookie(cookieList || [], cookieId);
        }, false);
        unpinnedMutate(async (outerCookieList) => {
          return filterEditedCookie(outerCookieList, res);
        }, false);
      }
      return;
    }
    alert("쿠키 읽기 실패");
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
  };
};

export default CookieModule;
