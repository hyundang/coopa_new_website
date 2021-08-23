import { getApi, postApi, putApi, delApi } from "@lib/api";
import { Newtab } from "@components/templates";
import { PostBookmarkDataProps } from "@interfaces/homeboard";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";

export default function NewtabPage() {
  // 검색 여부
  const [isSearched, setIsSearched] = useState(false);

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
  });

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

  useEffect(() => {
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
    <Newtab
      isSearched={isSearched}
      setIsSearched={setIsSearched}
      imgUrl="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
      homeboardModalImg={homeboardModalImg}
      setHomeboardModalImg={setHomeboardModalImg}
      homeboardImg={homeboardImg}
      setHomeboardImg={setHomeboardImg}
      postHomeboardImg={handlePostHomeboardImg}
      bookmarkDatas={bookmarkData !== undefined ? bookmarkData : []}
      onClickBookmarkSave={handleAddBookmark}
      onClickBookmarkDel={handleDelBookmark}
      cookieData={allCookieData !== undefined ? allCookieData : []}
      dirData={[]}
      isToastMsgVisible={isVisible}
      setIsToastMsgVisible={setIsVisible}
    />
  );
}
