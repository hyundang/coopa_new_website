import { useSWRInfinite } from "swr";
import reactCookie from "react-cookies";
import { Dispatch, SetStateAction, useState } from "react";
import {
  CookieDataProps,
  DirectoryCookieDataProps,
  directoryInfoType,
} from "@interfaces/cookie";
import {
  PostAddCookieToDirProps,
  PostDirectoryProps,
} from "@interfaces/directory";
import { ToastMsgVisibleStateProps } from "@interfaces/toastMsg";
import getApi from "@api/getApi";
import delApi from "@api/delApi";
import putApi from "@api/putApi";
import postApi from "@api/postApi";
import { returnCookieFilter } from "@lib/filter";

interface DirDetailModuleProps {
  /** swr key */
  key: string;
  /** initial cookie datas */
  initDirDetailData: DirectoryCookieDataProps;
  /** toast msg */
  isVisible: ToastMsgVisibleStateProps;
  setIsVisible: Dispatch<SetStateAction<ToastMsgVisibleStateProps>>;
}
const DirDetailModule = ({
  key,
  initDirDetailData,
  isVisible,
  setIsVisible,
}: DirDetailModuleProps) => {
  // 쿠키 필터
  const initFilter = reactCookie.load("cookieFilter");
  const [cookieFilter, setCookieFilter] = useState<
    "latest" | "readMost" | "readLeast" | "oldest"
  >(initFilter || "latest");
  const [cookieData, setCookieData] = useState<CookieDataProps[][]>([
    initDirDetailData.cookies,
  ]);
  const [DirInfo, setDirInfo] = useState<directoryInfoType>(
    initDirDetailData.directoryInfo,
  );

  // 쿠키 데이터 key 함수
  const getKey = (pageIndex: number, previousPageData: any) => {
    console.log("pageIndex: ", pageIndex);
    if (previousPageData && !previousPageData.length) return null; // 끝에 도달
    return `${key}?size=${COOKIE_PAGE_SIZE}&page=${pageIndex}&filter=${returnCookieFilter(
      cookieFilter,
    )}`;
  };

  // 디렉토리 상세 데이터 get
  const {
    data: DirDetailData,
    error,
    size: pageIndex,
    setSize: setPageIndex,
    mutate,
  } = useSWRInfinite(getKey, getApi.getDirCookieData, {
    initialData: [initDirDetailData],
    revalidateAll: false,
    errorRetryCount: 3,
    onSuccess: (data) => {
      console.log(data);
      setCookieData(
        data.map((prev1) => {
          return prev1?.cookies || [];
        }),
      );
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
  };

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
      // 갱신된 데이터일 때
      if (prevDepth1) {
        const newData = prevDepth1?.map((prevDepth2) => {
          if (res)
            return {
              directoryInfo: prevDepth2?.directoryInfo || DirInfo,
              cookies:
                prevDepth2?.cookies?.filter(
                  (cookie) => cookie.id !== res.cookieId,
                ) || [],
            };
          return prevDepth2;
        });
        return newData;
      }
      // initial data 일 때
      const newCookies = initDirDetailData.cookies.filter(
        (cookie) => cookie.id !== res?.cookieId,
      );
      return [
        {
          ...initDirDetailData,
          cookies: newCookies,
        },
      ];
    }, false);
    setIsVisible({
      ...isVisible,
      cookieDel: true,
    });
  };

  // 쿠키 edit
  const handleEditCookie = async (formData: FormData) => {
    // const res = await putApi.updateCookie(formData);
    // res &&
    //   (() => {
    //     mutate(
    //       key,
    //       setFilteredCookieData((prev) =>
    //         prev?.map((cookie) => {
    //           if (cookie.id === res.cookieId) {
    //             return {
    //               ...cookie,
    //               content: res.content,
    //               thumbnail: res.thumbnail,
    //               title: res.title,
    //             };
    //           }
    //           return cookie;
    //         }),
    //       ),
    //       false,
    //     );
    //     setIsVisible({
    //       ...isVisible,
    //       cookieEdit: true,
    //     });
    //   })();
  };

  // 디렉토리에 쿠키 추가
  const handleAddCookieToDir = async (body: PostAddCookieToDirProps) => {
    // const res = await postApi.postDirAddCookie(body);
    // res &&
    //   (() => {
    //     mutate(
    //       key,
    //       setFilteredCookieData((cookies) =>
    //         cookies?.filter((cookie) => cookie.id !== res.cookieId),
    //       ),
    //       false,
    //     );
    //   })();
  };

  // 쿠키 read 횟수
  const handleAddCookieCount = async (id: number) => {
    // const res = await postApi.postCookieCount(id);
    // res &&
    //   (() => {
    //     mutate(key, () => {}, false);
    //   })();
  };

  // 디렉토리 edit
  const handleEditDir = async (id: number, body: PostDirectoryProps) => {
    // const res = await putApi.updateDirectoryData(id, body);
    // res &&
    //   (() => {
    //     mutate(key, {
    //       ...DirDetailData,
    //       directoryInfo: {
    //         name: res.name,
    //         emoji: res.emoji,
    //       },
    //     });
    //     setIsVisible({
    //       ...isVisible,
    //       dirEdit: true,
    //     });
    //   })();
  };

  return {
    dirInfo: DirInfo,
    cookieFilter,
    handleCookieFilter,
    cookieData,
    pageIndex,
    setPageIndex,
    copyCookieLink,
    handleDelCookie,
    handleEditCookie,
    handleAddCookieToDir,
    handleAddCookieCount,
    handleEditDir,
    isError: error,
    isLoading: !DirDetailData && !error,
  };
};

export default DirDetailModule;
