import useSWR, { mutate } from "swr";
import reactCookie from "react-cookies";
import { Dispatch, SetStateAction, useState } from "react";
import { readCountAsc, readCountDesc } from "@lib/filter";
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
  const [cookieFilter, setCookieFilter] = useState<
    "latest" | "readMost" | "readLeast" | "oldest"
  >("latest");

  // 쿠키 필터 변경
  const handleCookieFilter = (
    filter: "latest" | "readMost" | "readLeast" | "oldest" | "abc",
  ) => {
    filter !== "abc" && setCookieFilter(filter);
    reactCookie.save("cookieFilter", filter, {
      path: "/",
      httpOnly: JSON.parse(HTTP_ONLY),
    });
    switch (filter) {
      case "readMost":
        setFilteredCookieData(
          allCookieData && [...allCookieData].sort(readCountDesc),
        );
        break;
      case "readLeast":
        setFilteredCookieData(
          allCookieData && [...allCookieData].sort(readCountAsc),
        );
        break;
      case "oldest":
        setFilteredCookieData(allCookieData && [...allCookieData].reverse());
        break;
      default:
        setFilteredCookieData(allCookieData);
        break;
    }
  };

  // 모든 쿠키 데이터 get
  const { data: allCookieData } = useSWR(key, getApi.getAllCookieData, {
    initialData: initAllCookieData,
    onErrorRetry: ({ retryCount }) => {
      // 3번 까지만 재시도함
      if (retryCount >= 3) return undefined;
      return true;
    },
    onSuccess: (data) => {
      const filter = reactCookie.load("cookieFilter");
      if (data && filter !== null) {
        switch (filter) {
          case "readMost":
            setCookieFilter("readMost");
            setFilteredCookieData([...data].sort(readCountDesc));
            break;
          case "readLeast":
            setCookieFilter("readLeast");
            setFilteredCookieData([...data].sort(readCountAsc));
            break;
          case "oldest":
            setCookieFilter("oldest");
            setFilteredCookieData([...data].reverse());
            break;
          default:
            setCookieFilter("latest");
            setFilteredCookieData([...data]);
            break;
        }
      } else if (data && filter === null) {
        setCookieFilter("latest");
        setFilteredCookieData([...data]);
      }
    },
  });

  // 필터링 된 쿠키 데이터 get
  const [filteredCookieData, setFilteredCookieData] = useState<
    CookieDataProps[] | undefined
  >(initAllCookieData);

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
    allCookieData,
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
