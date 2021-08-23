import { getApi, postApi, putApi, delApi } from "@lib/api";
import { Newtab } from "@components/templates";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";

export default function NewtabPage() {
  // 검색 여부
  const [isSearched, setIsSearched] = useState(false);

  // 홈보드 배경 이미지
  const [homeboardImg, setHomeboardImg] = useState("");
  // 홈보드 모달 이미지
  const [homeboardModalImg, setHomeboardModalImg] = useState("");

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
      cookieData={[]}
      dirData={[]}
      isToastMsgVisible={isVisible}
      setIsToastMsgVisible={setIsVisible}
    />
  );
}
