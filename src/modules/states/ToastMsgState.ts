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
    imgSizeOver: false,
    copyLink: false,
    copyShareLink: false,
  },
});

export default ToastMsgState;
