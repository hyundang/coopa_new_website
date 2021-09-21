import { getApi } from "@lib/api";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { NewtabError } from "@components/templates";
import { NetworkErrorImg } from "@assets/imgs/error";
import { UserDataProps } from "@interfaces/user";

export default function InternalServerError({
  initUserData,
}: {
  initUserData: UserDataProps;
}) {
  // 홈보드 배경 이미지
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
  const handleGetHomeboardImg = async () => {
    const homeboardImgUrl = await getApi.getHomeboardData();
    localStorage.setItem("homeboardImgUrl", homeboardImgUrl);
    setHomeboardImg(homeboardImgUrl);
  };

  useEffect(() => {
    // 홈보드 이미지 세팅
    const homeboardImgUrl = localStorage.getItem("homeboardImgUrl");
    homeboardImgUrl?.length === 1
      ? setHomeboardImg(`/theme_img/img_${homeboardImgUrl}.jpg`)
      : homeboardImgUrl !== null
      ? setHomeboardImg(homeboardImgUrl)
      : handleGetHomeboardImg();

    // 북마크 세팅
    const bookmark = localStorage.getItem("bookmark");
    bookmark !== null &&
      mutate("/users/favorites", JSON.parse(bookmark), false);
  }, []);

  return (
    <NewtabError
      imgUrl={initUserData?.profileImage}
      homeboardImg={homeboardImg}
      bookmarkDatas={bookmarkData || []}
      errorImg={NetworkErrorImg}
      errorImgWidth={183}
      text="앗, 인터넷 연결을 확인해주세요! 😮"
      text2="확인 후 다시 도전하시겠어요?"
    />
  );
}
