import React from "react";
import { useRecoilState } from "recoil";
import { ToastMsg } from "@components/atoms";
import { ToastMsgState } from "@modules/states";

const ToastMsgs = () => {
  // tost msg
  const [isToastMsgVisible, setIsToastMsgVisible] =
    useRecoilState(ToastMsgState);

  // toast msg visible handling
  const handleToastMsgVisible = (
    key:
      | "dirCreate"
      | "dirDel"
      | "dirEdit"
      | "cookieDel"
      | "cookieEdit"
      | "bookmarkDel"
      | "bookmarkCreate"
      | "homeboardEdit"
      | "imgSizeOver"
      | "copyLink"
      | "pinnedSizeOver"
      | "cookieCreateError"
      | "cookieDelError"
      | "cookieEditError"
      | "cookieDirEditError"
      | "dirCreateError"
      | "dirDelError"
      | "dirEditError"
      | "homeboardImgError"
      | "bookmarkCreateError"
      | "bookmarkDelError",
    value: boolean,
  ) =>
    setIsToastMsgVisible({
      ...isToastMsgVisible,
      [key]: value,
    });
  return (
    <>
      <ToastMsg
        isVisible={isToastMsgVisible.dirCreate}
        setIsVisible={(e: boolean) => handleToastMsgVisible("dirCreate", e)}
      >
        🤘 디렉토리를 만들었어요!
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.dirEdit}
        setIsVisible={(e: boolean) => handleToastMsgVisible("dirEdit", e)}
      >
        👀 디렉토리를 수정했어요!
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.dirDel}
        setIsVisible={(e: boolean) => handleToastMsgVisible("dirDel", e)}
      >
        ❌ 디렉토리를 삭제했어요!
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.copyLink}
        setIsVisible={(e: boolean) => handleToastMsgVisible("copyLink", e)}
      >
        👏🏻 링크를 복사했어요!
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.cookieDel}
        setIsVisible={(e: boolean) => handleToastMsgVisible("cookieDel", e)}
      >
        ❌ 쿠키를 삭제했어요!
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.cookieEdit}
        setIsVisible={(e: boolean) => handleToastMsgVisible("cookieEdit", e)}
      >
        🍪 쿠키를 수정했어요!
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.bookmarkDel}
        setIsVisible={(e: boolean) => handleToastMsgVisible("bookmarkDel", e)}
      >
        ❌ 즐겨찾기를 삭제했어요!
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.bookmarkCreate}
        setIsVisible={(e: boolean) =>
          handleToastMsgVisible("bookmarkCreate", e)
        }
      >
        🤘 즐겨찾기를 만들었어요!
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.homeboardEdit}
        setIsVisible={(e: boolean) => handleToastMsgVisible("homeboardEdit", e)}
      >
        🤘 홈보드 이미지를 변경했어요!
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.imgSizeOver}
        setIsVisible={(e: boolean) => handleToastMsgVisible("imgSizeOver", e)}
        imgSizeOver
      >
        😥 더 작은 이미지를 올려주세요!
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.pinnedSizeOver}
        setIsVisible={(e: boolean) =>
          handleToastMsgVisible("pinnedSizeOver", e)
        }
        imgSizeOver
      >
        😥 최대 15개까지 고정 가능해요!
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.cookieCreateError}
        setIsVisible={(e: boolean) =>
          handleToastMsgVisible("cookieCreateError", e)
        }
      >
        😳 쿠키 추가에 실패했어요. 다시 시도해볼까요?
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.cookieDelError}
        setIsVisible={(e: boolean) =>
          handleToastMsgVisible("cookieDelError", e)
        }
      >
        😳 쿠키 삭제에 실패했어요. 다시 시도해볼까요?
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.cookieEditError}
        setIsVisible={(e: boolean) =>
          handleToastMsgVisible("cookieEditError", e)
        }
      >
        😳 쿠키 수정에 실패했어요. 다시 시도해볼까요?
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.cookieDirEditError}
        setIsVisible={(e: boolean) =>
          handleToastMsgVisible("cookieDirEditError", e)
        }
      >
        😳 디렉토리 변경에 실패했어요. 다시 시도해볼까요?
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.dirCreateError}
        setIsVisible={(e: boolean) =>
          handleToastMsgVisible("dirCreateError", e)
        }
      >
        😔 디렉토리 생성에 실패했어요. 다시 시도해볼까요?
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.dirDelError}
        setIsVisible={(e: boolean) => handleToastMsgVisible("dirDelError", e)}
      >
        😔 디렉토리 삭제에 실패했어요. 다시 시도해볼까요?
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.dirEditError}
        setIsVisible={(e: boolean) => handleToastMsgVisible("dirEditError", e)}
      >
        😔 디렉토리 수정에 실패했어요. 다시 시도해볼까요?
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.homeboardImgError}
        setIsVisible={(e: boolean) =>
          handleToastMsgVisible("homeboardImgError", e)
        }
      >
        😔 홈보드 이미지 변경에 실패했어요. 다시 시도해볼까요?
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.bookmarkCreateError}
        setIsVisible={(e: boolean) =>
          handleToastMsgVisible("bookmarkCreateError", e)
        }
      >
        😔 북마크 생성에 실패했어요. 다시 시도해볼까요?
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.bookmarkDelError}
        setIsVisible={(e: boolean) =>
          handleToastMsgVisible("bookmarkDelError", e)
        }
      >
        😔 북마크 삭제에 실패했어요. 다시 시도해볼까요?
      </ToastMsg>
    </>
  );
};

export default ToastMsgs;
