import useSWR, { mutate } from "swr";
import { Dispatch, SetStateAction, useState } from "react";
import {
  BookmarkDataProps,
  PostBookmarkDataProps,
} from "@interfaces/homeboard";
import { ToastMsgVisibleStateProps } from "@interfaces/toastMsg";
import getApi from "@api/getApi";
import delApi from "@api/delApi";
import putApi from "@api/putApi";
import postApi from "@api/postApi";

interface HomebrdModuleProps {
  /** initial homeboard datas */
  initBookmarkData: BookmarkDataProps[];
  initHomeboardImgUrl?: string;
  /** toast msg */
  isVisible: ToastMsgVisibleStateProps;
  setIsVisible: Dispatch<SetStateAction<ToastMsgVisibleStateProps>>;
}
const HomebrdModule = ({
  initHomeboardImgUrl,
  initBookmarkData,
  isVisible,
  setIsVisible,
}: HomebrdModuleProps) => {
  // 홈보드 배경 이미지
  const [homeboardImg, setHomeboardImg] = useState(initHomeboardImgUrl || "");
  // 홈보드 모달 이미지
  const [homeboardModalImg, setHomeboardModalImg] = useState(
    initHomeboardImgUrl || "",
  );

  // 홈보드 이미지 get
  const handleGetHomeboardImg = async () => {
    const homeboardImgUrl = await getApi.getHomeboardData();
    localStorage.setItem("homeboardImgUrl", homeboardImgUrl);
    setHomeboardImg(homeboardImgUrl);
    setHomeboardModalImg(homeboardImgUrl);
  };

  // 홈보드 이미지 edit
  const handlePostHomeboardImg = async (e: File) => {
    const homeboardImgUrl = await putApi.putHomeboardData(e);
    localStorage.setItem("homeboardImgUrl", homeboardImgUrl);
    return homeboardImgUrl;
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
        setIsVisible({
          ...isVisible,
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
        setIsVisible({
          ...isVisible,
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
