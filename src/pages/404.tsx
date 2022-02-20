// assets
import { NotFoundErrorImg } from "@assets/imgs/error";
// components
import { NewtabError } from "@components/templates";
// libs
import React, { useEffect } from "react";
// modules
import ErrorModule from "@modules/ErrorModule";

export default function NotFound() {
  const errorModule = ErrorModule();

  useEffect(() => {
    errorModule.setHomeboardImgUrl();
    errorModule.setBookmark();
  }, []);

  return (
    <NewtabError
      homeboardImg={errorModule.homeboardImg}
      bookmarkDatas={errorModule.bookmarkData || []}
      errorImg={NotFoundErrorImg}
      errorImgWidth={141}
      text="앗, 찾을 수 없는 페이지에요..😢️"
      text2="확인 후 다시 함께하시겠어요?"
      is404Error
    />
  );
}
