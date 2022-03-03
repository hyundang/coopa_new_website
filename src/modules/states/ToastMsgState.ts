import { ToastMsgVisibleStateProps } from "@interfaces/toastMsg";
import { atom } from "recoil";

const ToastMsgState = atom<ToastMsgVisibleStateProps>({
  key: "TOASTMSG",
  default: {
    dirCreate: false,
    dirDel: false,
    dirEdit: false,
    cookieDel: false,
    cookieEdit: false,
    bookmarkDel: false,
    bookmarkCreate: false,
    homeboardEdit: false,
    copyLink: false,
    copyShareLink: false,
    profileEdit: false,
    // cookie
    cookieCreateError: false,
    cookieUrlError: false,
    cookieDelError: false,
    cookieEditError: false,
    cookieDirEditError: false,
    // directory
    dirCreateError: false,
    dirDelError: false,
    dirEditError: false,
    pinnedSizeOver: false,
    // homeboard
    bookmarkCreateError: false,
    bookmarkDelError: false,
    homeboardImgError: false,
    imgSizeOver: false,
    // etc
    profileEditError: false,
    networkError: false,
  },
});

export default ToastMsgState;
