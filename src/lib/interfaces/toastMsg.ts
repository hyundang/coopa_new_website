interface CookieErrorProps {
  cookieCreateError: boolean;
  cookieUrlError: boolean;
  cookieDelError: boolean;
  cookieEditError: boolean;
  cookieDirEditError: boolean;
}

interface DirErrorProps {
  dirCreateError: boolean;
  dirDelError: boolean;
  dirEditError: boolean;
  pinnedSizeOver: boolean;
}

interface HomeboardErrorProps {
  bookmarkCreateError: boolean;
  bookmarkDelError: boolean;
  homeboardImgError: boolean;
  imgSizeOver: boolean;
}

interface EtcErrorProps {
  profileEditError: boolean;
  networkError: boolean;
}

export interface ToastMsgVisibleStateProps
  extends CookieErrorProps,
    DirErrorProps,
    HomeboardErrorProps,
    EtcErrorProps {
  dirCreate: boolean;
  dirDel: boolean;
  dirEdit: boolean;
  cookieDel: boolean;
  cookieEdit: boolean;
  bookmarkDel: boolean;
  bookmarkCreate: boolean;
  homeboardEdit: boolean;
  copyLink: boolean;
  copyShareLink: boolean;
  profileEdit: boolean;
}
