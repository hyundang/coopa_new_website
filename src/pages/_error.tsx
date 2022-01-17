// assets
import { NotFoundErrorImg } from "@assets/imgs/error";
// components
import { NewtabError } from "@components/templates";
// interfaces
import { UserDataProps } from "@interfaces/user";
// libs
import React, { useEffect } from "react";
// modules
import ErrorModule from "@modules/ErrorModule";

export default function Error({
  initUserData,
}: {
  initUserData: UserDataProps;
}) {
  const errorModule = ErrorModule();

  useEffect(() => {
    errorModule.setHomeboardImgUrl();
    errorModule.setBookmark();
  }, []);

  return (
    <NewtabError
      imgUrl={initUserData?.profileImage}
      homeboardImg={errorModule.homeboardImg}
      bookmarkDatas={errorModule.bookmarkData || []}
      errorImg={NotFoundErrorImg}
      errorImgWidth={141}
      text="앗, 오류가 발생했어요 😮"
      text2="다시 한번 함께해주시겠어요?"
    />
  );
}
