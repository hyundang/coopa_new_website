// apis
import { getApi, delApi, postApi, putApi } from "@api/index";
// interfaces
import {
  BookmarkDataProps,
  PostBookmarkDataProps,
} from "@interfaces/homeboard";
// libs
import useSWR, { mutate } from "swr";
import { useEffect, useState } from "react";
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
  const handleGetHomeboardImg = async () => {
    const homeboardImgUrl = await getApi.getHomeboardData();
    localStorage.setItem("homeboardImgUrl", homeboardImgUrl);
    setHomeboardImg(homeboardImgUrl);
    setHomeboardModalImg(homeboardImgUrl);
  };

  // 홈보드 이미지 edit
  const handlePostHomeboardImg = async (e: File): Promise<string> => {
    const homeboardImgUrl = await putApi.putHomeboardData(e);
    localStorage.setItem("homeboardImgUrl", String(homeboardImgUrl));
    return String(homeboardImgUrl);
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
    },
  );
  // 북마크 post
  const handleAddBookmark = async (newValue: PostBookmarkDataProps) => {
    const res = await postApi.postBookmarkData(newValue);
    res &&
      (() => {
        mutate("/users/favorites", bookmarkData?.concat([res]), false);
        setIsToastMsgVisible({
          ...isToastMsgVisible,
          bookmarkCreate: true,
        });
      })();
  };

  // 북마크 delete
  const handleDelBookmark = async (bookmarkID: number) => {
    const res = await delApi.delBookmarkData(bookmarkID);
    res &&
      (() => {
        mutate(
          "/users/favorites",
          bookmarkData?.filter((bd) => res.id !== bd.id),
          false,
        );
        setIsToastMsgVisible({
          ...isToastMsgVisible,
          bookmarkDel: true,
        });
      })();
  };

  return {
    homeboardImg,
    setHomeboardImg,
    homeboardModalImg,
    setHomeboardModalImg,
    handleGetHomeboardImg,
    handlePostHomeboardImg,
    bookmarkData,
    handleAddBookmark,
    handleDelBookmark,
  };
};

export default HomebrdModule;
