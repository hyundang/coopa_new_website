// apis
import { getApi, delApi, postApi, putApi } from "@api/index";
// interfaces
import { BookmarkDataProps, CreateBookmarkProps } from "@interfaces/homeboard";
// libs
import useSWR, { mutate } from "swr";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
// modules
import { HomeboardState, ToastMsgState } from "./states";

interface HomebrdModuleProps {
  /** initial homeboard datas */
  initBookmarkData: BookmarkDataProps[];
  initHomeboardImgUrl?: string;
}
const HomebrdModule = ({
  initHomeboardImgUrl,
  initBookmarkData,
}: HomebrdModuleProps) => {
  // toast msg
  const [isToastMsgVisible, setIsToastMsgVisible] =
    useRecoilState(ToastMsgState);
  // 홈보드 배경 이미지
  const [homeboardImg, setHomeboardImg] = useRecoilState(
    HomeboardState.HomeboardImgState,
  );
  // 홈보드 수정 모달 이미지
  const [homeboardModalImg, setHomeboardModalImg] = useRecoilState(
    HomeboardState.HomeboardModalImgState,
  );

  useEffect(() => {
    setHomeboardImg(initHomeboardImgUrl || "");
    setHomeboardModalImg(initHomeboardImgUrl || "");
  }, []);

  // 홈보드 이미지 get
  const getHomeboardImg = async () => {
    const homeboardImgUrl = await getApi.getHomeboardData();
    if (homeboardImgUrl) {
      localStorage.setItem("homeboardImgUrl", homeboardImgUrl);
      setHomeboardImg(homeboardImgUrl);
      setHomeboardModalImg(homeboardImgUrl);
      return;
    }
    if (localStorage.getItem("x-access-token") !== null)
      setIsToastMsgVisible({
        ...isToastMsgVisible,
        homeboardImgError: true,
      });
  };

  // 홈보드 이미지 edit
  const updateHomeboardImg = async (e: File): Promise<string> => {
    const homeboardImgUrl = await putApi.putHomeboardData(e);
    if (homeboardImgUrl) {
      localStorage.setItem("homeboardImgUrl", String(homeboardImgUrl));
      return String(homeboardImgUrl);
    }
    setIsToastMsgVisible({
      ...isToastMsgVisible,
      homeboardImgError: true,
    });
    return homeboardImg;
  };

  // 북마크 get
  const { data: bookmarkData } = useSWR(
    "/users/favorites",
    getApi.getBookmarkData,
    {
      initialData: initBookmarkData,
      onSuccess: async (data) => {
        localStorage.setItem("bookmark", JSON.stringify(data));
      },
      shouldRetryOnError: false,
    },
  );

  // 북마크 post
  const createBookmark = async (newValue: CreateBookmarkProps) => {
    const res = await postApi.postBookmarkData(newValue);
    if (res) {
      mutate("/users/favorites", bookmarkData?.concat([res]), false);
      setIsToastMsgVisible({
        ...isToastMsgVisible,
        bookmarkCreate: true,
      });
      return;
    }
    setIsToastMsgVisible({
      ...isToastMsgVisible,
      bookmarkCreateError: true,
    });
  };

  // 북마크 delete
  const deleteBookmark = async (bookmarkID: number) => {
    const res = await delApi.delBookmarkData(bookmarkID);
    if (res) {
      mutate(
        "/users/favorites",
        bookmarkData?.filter((bd) => res.id !== bd.id),
        false,
      );
      setIsToastMsgVisible({
        ...isToastMsgVisible,
        bookmarkDel: true,
      });
      return;
    }
    setIsToastMsgVisible({
      ...isToastMsgVisible,
      bookmarkDelError: true,
    });
  };

  return {
    homeboardImg,
    setHomeboardImg,
    homeboardModalImg,
    setHomeboardModalImg,
    getHomeboardImg,
    updateHomeboardImg,
    bookmarkData,
    createBookmark,
    deleteBookmark,
  };
};

export default HomebrdModule;
