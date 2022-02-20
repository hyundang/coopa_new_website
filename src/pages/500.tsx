// assets
import { NetworkErrorImg } from "@assets/imgs/error";
// components
import { NewtabError } from "@components/templates";
// libs
import React, { useEffect } from "react";
// modules
import ErrorModule from "@modules/ErrorModule";

export default function InternalServerError() {
  const errorModule = ErrorModule();

  useEffect(() => {
    errorModule.setHomeboardImgUrl();
    errorModule.setBookmark();
  }, []);

  return (
    <NewtabError
      homeboardImg={errorModule.homeboardImg}
      bookmarkDatas={errorModule.bookmarkData || []}
      errorImg={NetworkErrorImg}
      errorImgWidth={183}
      text="앗, 인터넷 연결을 확인해주세요! 😮"
      text2="확인 후 다시 도전하시겠어요?"
    />
  );
}
