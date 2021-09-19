import { getApi, postApi, putApi, delApi } from "@lib/api";
import { Newtab } from "@components/templates";
import { PostBookmarkDataProps } from "@interfaces/homeboard";
import {
  readCountDesc,
  readCountAsc,
  idCountAsc,
  idCountDesc,
} from "@lib/filter";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { CookieDataProps } from "@interfaces/cookie";
import {
  DirectoryDataProps,
  PostDirAddCookieProps,
  PostDirectoryProps,
} from "@interfaces/directory";
import { useRouter } from "next/dist/client/router";

export default function NewtabPage() {
  // 로그인 여부
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  // 검색 여부
  const [isSearched, setIsSearched] = useState(false);
  // 검색어
  const [searchValue, setSearchValue] = useState("");

  // 홈보드 배경 이미지
  const [homeboardImg, setHomeboardImg] = useState("");
  // 홈보드 모달 이미지
  const [homeboardModalImg, setHomeboardModalImg] = useState("");

  // 북마크 데이터 get
  const { data: bookmarkData } = useSWR(
    "/users/favorites",
    getApi.getBookmarkData,
    {
      onSuccess: async (data) => {
        localStorage.setItem("bookmark", JSON.stringify(data));
      },
    },
  );

  // 모든 쿠키 데이터 get
  const { data: allCookieData } = useSWR("/cookies", getApi.getAllCookieData, {
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
  // 검색된 쿠키 데이터
  const { data: searchedCookieData } = useSWR(
    "/cookies/search",
    getApi.getSearchedCookieData,
    { revalidateOnFocus: false },
  );
  // 쿠키 필터
  const [cookieFilter, setCookieFilter] = useState<
    "latest" | "readMost" | "readLeast" | "oldest"
  >("latest");
  // 필터링 된 쿠키 데이터
  const [filteredCookieData, setFilteredCookieData] = useState<
    CookieDataProps[] | undefined
  >([]);
  // 쿠키 삭제
  const handleDelCookie = async (cookieId: number) => {
    const res = await delApi.delCookieData(cookieId);
    res &&
      (() => {
        mutate(
          "/cookies/:id",
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

  // 쿠키 수정
  const handleEditCookie = async (formData: FormData) => {
    const res = await putApi.updateCookie(formData);
    res &&
      (() => {
        mutate(
          "/cookies",
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
  //디렉토리에 쿠키 추가
  const handleDirAddCookie = async (body: PostDirAddCookieProps) => {
    const res = await postApi.postDirAddCookie(body);
    res &&
      (() => {
        mutate(
          "/directories/add/cookie",
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
  // 모든 디렉토리 데이터 get
  const { data: allDirData } = useSWR("/directories", getApi.getAllDirData, {
    onErrorRetry: ({ retryCount }) => {
      // 3번 까지만 재시도함
      if (retryCount >= 3) return undefined;
      return true;
    },
    onSuccess: (data) => {
      const filter = localStorage.getItem("dirFilter");
      if (data && filter !== null) {
        switch (filter) {
          case "latest":
            setDirFilter("latest");
            setFilteredDirData([...data].sort(idCountDesc));
            break;
          case "oldest":
            setDirFilter("oldest");
            setFilteredDirData([...data].sort(idCountAsc));
            break;
          default:
            setDirFilter("abc");
            setFilteredDirData(data);
            break;
        }
      } else if (data && filter === null) {
        setDirFilter("abc");
        setFilteredDirData([...data]);
      }
    },
  });
  // 디렉토리 생성
  const handlePostDir = async (newValue: PostDirectoryProps) => {
    const res = await postApi.postDirectoryData(newValue);
    res &&
      (() => {
        mutate(
          "/directories",
          () => {
            const newDirList: DirectoryDataProps = {
              emoji: res.emoji,
              id: res.directoryId,
              name: res.name,
              cookieCnt: 0,
            };
            setFilteredDirData((prev) => prev?.concat(newDirList));
          },
          false,
        );
        setIsVisible({
          ...isVisible,
          dirCreate: true,
        });
      })();
  };
  //디렉토리 삭제
  const handleDelDirectory = async (dirId: number) => {
    const res = await delApi.delDirData(dirId);
    res &&
      (() => {
        mutate(
          "/directory/:id",
          setFilteredDirData((prev) =>
            prev?.filter((dir) => dir.id !== res.id),
          ),
          false,
        );
        setIsVisible({
          ...isVisible,
          dirDel: true,
        });
      })();
  };
  //디렉토리 수정
  const handleUpdateDirectory = async (
    id: number,
    body: PostDirectoryProps,
  ) => {
    const res = await putApi.updateDirectoryData(id, body);
    res &&
      (() => {
        mutate(
          "/directories/:id",
          setFilteredDirData((prev) =>
            prev?.map((dir) => {
              if (dir.id === id) {
                return {
                  ...dir,
                  name: body.name || "",
                  emoji: body.emoji || "",
                };
              }
              return dir;
            }),
          ),
          false,
        );
        setIsVisible({
          ...isVisible,
          dirEdit: true,
        });
      })();
  };
  // 검색된 디렉토리 데이터
  const { data: searchedDirData } = useSWR(
    "/directories/search",
    getApi.getSearchedDirData,
    { revalidateOnFocus: false },
  );
  // 디렉토리 필터
  const [dirFilter, setDirFilter] = useState<"latest" | "oldest" | "abc">(
    "latest",
  );
  // 필터링 된 디렉토리 데이터
  const [filteredDirData, setFilteredDirData] = useState<
    DirectoryDataProps[] | undefined
  >([]);

  // toast msg visible state
  const [isVisible, setIsVisible] = useState({
    dirCreate: false,
    dirDel: false,
    dirEdit: false,
    cookieDel: false,
    cookieEdit: false,
    bookmarkDel: false,
    bookmarkCreate: false,
    homeboardEdit: false,
    imgSizeOver: false,
  });

  // 검색창 enter 키 클릭 시
  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsSearched(true);
      mutate(
        "/cookies/search",
        await getApi.getSearchedCookieData(searchValue),
        false,
      );
      mutate(
        "/directories/search",
        await getApi.getSearchedDirData(searchValue),
        false,
      );
    }
  };

  // 홈보드 이미지 get
  const handleGetHomeboardImg = async () => {
    const homeboardImgUrl = await getApi.getHomeboardData();
    localStorage.setItem("homeboardImgUrl", homeboardImgUrl);
    setHomeboardImg(homeboardImgUrl);
    setHomeboardModalImg(homeboardImgUrl);
  };

  // 홈보드 이미지 변경
  const handlePostHomeboardImg = async (e: File) => {
    const homeboardImgUrl = await putApi.putHomeboardData(e);
    localStorage.setItem("homeboardImgUrl", homeboardImgUrl);
    return homeboardImgUrl;
  };

  // 북마크 추가
  const handleAddBookmark = async (newValue: PostBookmarkDataProps) => {
    const res = await postApi.postBookmarkData(newValue);
    res &&
      (() => {
        mutate("/users/favorites", bookmarkData?.concat([res]), false);
        setIsVisible({
          ...isVisible,
          bookmarkCreate: true,
        });
      })();
  };

  // 북마크 삭제
  const handleDelBookmark = async (bookmarkID: number) => {
    const res = await delApi.delBookmarkData(bookmarkID);
    res &&
      (() => {
        mutate(
          "/users/favorites",
          bookmarkData?.filter((bd) => res.id !== bd.id),
          false,
        );
        setIsVisible({
          ...isVisible,
          bookmarkDel: true,
        });
      })();
  };

  // 쿠키 필터 변경
  const handleCookieFilter = (
    filter: "latest" | "readMost" | "readLeast" | "oldest" | "abc",
  ) => {
    filter !== "abc" && setCookieFilter(filter);
    localStorage.setItem("cookieFilter", filter);
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

  // 디렉토리 필터 변경
  const handleDirFilter = (
    filter: "latest" | "readMost" | "readLeast" | "oldest" | "abc",
  ) => {
    filter !== "readMost" && filter !== "readLeast" && setDirFilter(filter);
    localStorage.setItem("dirFilter", filter);
    switch (filter) {
      case "latest":
        setFilteredDirData(allDirData && [...allDirData].sort(idCountDesc));
        break;
      case "oldest":
        setFilteredDirData(allDirData && [...allDirData].sort(idCountAsc));
        break;
      default:
        setFilteredDirData(allDirData);
        break;
    }
  };

  useEffect(() => {
    // 로그인 여부 검사
    localStorage.getItem("x-access-token") === null
      ? router.replace("/login")
      : setIsLogin(true);
    // 홈보드 이미지 세팅
    const homeboardImgUrl = localStorage.getItem("homeboardImgUrl");
    homeboardImgUrl?.length === 1
      ? setHomeboardImg(`/theme_img/img_${homeboardImgUrl}.jpg`)
      : homeboardImgUrl !== null
      ? (() => {
          setHomeboardImg(homeboardImgUrl);
          setHomeboardModalImg(homeboardImgUrl);
        })()
      : handleGetHomeboardImg();

    // 북마크 세팅
    const bookmark = localStorage.getItem("bookmark");
    bookmark !== null &&
      mutate("/users/favorites", JSON.parse(bookmark), false);
  }, []);

  return (
    <>
      {isLogin ? (
        <Newtab
          isSearched={isSearched}
          setIsSearched={setIsSearched}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onKeyPress={handleKeyPress}
          imgUrl="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
          homeboardModalImg={homeboardModalImg}
          setHomeboardModalImg={setHomeboardModalImg}
          homeboardImg={homeboardImg}
          setHomeboardImg={setHomeboardImg}
          postHomeboardImg={handlePostHomeboardImg}
          bookmarkDatas={bookmarkData || []}
          onClickBookmarkSave={handleAddBookmark}
          onClickBookmarkDel={handleDelBookmark}
          cookieData={filteredCookieData || []}
          searchedCookieData={searchedCookieData || []}
          cookieFilter={cookieFilter}
          setCookieFilter={handleCookieFilter}
          dirData={filteredDirData || []}
          searchedDirData={searchedDirData || []}
          dirFilter={dirFilter}
          setDirFilter={handleDirFilter}
          isToastMsgVisible={isVisible}
          setIsToastMsgVisible={setIsVisible}
          postDir={handlePostDir}
          delCookieHandler={handleDelCookie}
          handleEditCookie={handleEditCookie}
          handleDelDirectory={handleDelDirectory}
          handleDirAddCookie={handleDirAddCookie}
          handleUpdateDirectory={handleUpdateDirectory}
        />
      ) : (
        <></>
      )}
    </>
  );
}
