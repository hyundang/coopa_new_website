// apis
import { getApi } from "@api/index";
// libs
import useSWR, { mutate } from "swr";
import { useState } from "react";

const ErrorModule = () => {
  const [homeboardImg, setHomeboardImg] = useState("");

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

  // 홈보드 이미지 get
  const getHomeboardImg = async () => {
    const homeboardImgUrl = await getApi.getHomeboardData();
    if (homeboardImgUrl) {
      localStorage.setItem("homeboardImgUrl", homeboardImgUrl);
      setHomeboardImg(homeboardImgUrl);
    }
  };

  const setHomeboardImgUrl = () => {
    const homeboardImgUrl = localStorage.getItem("homeboardImgUrl");
    homeboardImgUrl?.length === 1
      ? setHomeboardImg(`/theme_img/img_${homeboardImgUrl}.jpg`)
      : homeboardImgUrl !== null
      ? setHomeboardImg(homeboardImgUrl)
      : getHomeboardImg();
  };

  const setBookmark = () => {
    const bookmark = localStorage.getItem("bookmark");
    bookmark !== null &&
      mutate("/users/favorites", JSON.parse(bookmark), false);
  };

  return {
    homeboardImg,
    getHomeboardImg,
    setHomeboardImgUrl,
    bookmarkData,
    setBookmark,
  };
};

export default ErrorModule;
