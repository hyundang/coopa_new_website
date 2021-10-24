import useSWR, { mutate } from "swr";
import reactCookie from "react-cookies";
import { Dispatch, SetStateAction, useState } from "react";
import {
  idCountAsc,
  idCountDesc,
  readCountAsc,
  readCountDesc,
} from "@lib/filter";
import { CookieDataProps } from "@interfaces/cookie";
import { PostAddCookieToDirProps } from "@interfaces/directory";
import { ToastMsgVisibleStateProps } from "@interfaces/toastMsg";
import getApi from "@api/getApi";
import delApi from "@api/delApi";
import putApi from "@api/putApi";
import postApi from "@api/postApi";

interface CookieModuleProps {
  /** swr key */
  key: string;
  /** initial cookie datas */
  initAllCookieData: CookieDataProps[];
  /** toast msg */
  isVisible: ToastMsgVisibleStateProps;
  setIsVisible: Dispatch<SetStateAction<ToastMsgVisibleStateProps>>;
}
const CookieModule = ({
  key,
  initAllCookieData,
  isVisible,
  setIsVisible,
}: CookieModuleProps) => {
  // 쿠키 필터
  const initFilter = reactCookie.load("cookieFilter");
  const [cookieFilter, setCookieFilter] = useState<
    "latest" | "readMost" | "readLeast" | "oldest"
  >(initFilter || "latest");

  // 필터링 된 쿠키 데이터 반환
  const returnFilteredCookieData = (
    cookies: CookieDataProps[],
    filter: "latest" | "readMost" | "readLeast" | "oldest" | undefined,
  ) => {
    if (cookies && filter) {
      switch (filter) {
        case "readMost":
          return cookies.sort(readCountDesc);
        case "readLeast":
          return cookies.sort(readCountAsc);
        case "oldest":
          return cookies.sort(idCountAsc);
        default:
          return cookies.sort(idCountDesc);
      }
    } else if (cookies && !filter) {
      return cookies.sort(idCountDesc);
    }
  };

  // 모든 쿠키 데이터 get
  const { data: allCookieData } = useSWR(key, getApi.getAllCookieData, {
    initialData: returnFilteredCookieData(initAllCookieData, initFilter),
    onErrorRetry: ({ retryCount }) => {
      // 3번 까지만 재시도함
      if (retryCount >= 3) return undefined;
      return true;
    },
    onSuccess: (data) => {
      // 필터에 따라 쿠키 데이터 정렬
      setFilteredCookieData(returnFilteredCookieData(data || [], cookieFilter));
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
    // 필터에 따라 쿠키 데이터 정렬
    setFilteredCookieData(
      returnFilteredCookieData(
        allCookieData || [],
        filter !== "abc" ? filter : "latest",
      ),
    );
  };

  // 필터링 된 쿠키 데이터 get
  const [filteredCookieData, setFilteredCookieData] = useState<
    CookieDataProps[] | undefined
  >(allCookieData);

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
    const res = await delApi.delCookieData(cookieId);
    res &&
      (() => {
        mutate(
          key,
          setFilteredCookieData((prev) =>
            prev?.filter((cookie) => cookie.id !== res.cookieId),
          ),
          false,
        );
        setIsVisible({
          ...isVisible,
          cookieDel: true,
        });
      })();
  };

  // 쿠키 edit
  const handleEditCookie = async (formData: FormData) => {
    const res = await putApi.updateCookie(formData);
    res &&
      (() => {
        mutate(
          key,
          setFilteredCookieData((prev) =>
            prev?.map((cookie) => {
              if (cookie.id === res.cookieId) {
                return {
                  ...cookie,
                  content: res.content,
                  thumbnail: res.thumbnail,
                  title: res.title,
                };
              }
              return cookie;
            }),
          ),
          false,
        );
        setIsVisible({
          ...isVisible,
          cookieEdit: true,
        });
      })();
  };

  // 디렉토리에 쿠키 추가
  const handleAddCookieToDir = async (body: PostAddCookieToDirProps) => {
    const res = await postApi.postDirAddCookie(body);
    res &&
      (() => {
        mutate(
          key,
          setFilteredCookieData((cookies) =>
            cookies?.map((cookie) => {
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
            }),
          ),
          false,
        );
      })();
  };
  const handleAddCookieCount = async (id: number) => {
    const res = await postApi.postCookieCount(id);
    res &&
      (() => {
        mutate(key, () => {}, false);
      })();
  };

  return {
    cookieFilter,
    handleCookieFilter,
    filteredCookieData,
    searchedCookieData,
    copyCookieLink,
    handleDelCookie,
    handleEditCookie,
    handleAddCookieToDir,
    handleAddCookieCount,
  };
};

export default CookieModule;
