import reactCookie from "react-cookies";
import SaveDataInWebCookie from "./SaveDataInWebCookie";

const CheckNotiUpdate = (): boolean => {
  const version = reactCookie.load("version");

  // 처음 웹 진입했을 때
  if (!version) {
    SaveDataInWebCookie("version", VERSION);
    SaveDataInWebCookie("isNotiUpdated", true);
    return true;
  }
  // 업데이트 되었을 때
  if (version !== VERSION) {
    SaveDataInWebCookie("version", VERSION);
    SaveDataInWebCookie("isNotiUpdated", true);
    return true;
  }

  // noti 기간 계산
  //   if (localStorage.getItem("notiDate") !== UPDATE_DATE) {
  //     localStorage.setItem("notiDate", UPDATE_DATE);
  //     const dateArr = localStorage.getItem("notiDate").split("-");
  //     const today = new Date();
  //     const date = new Date(dateArr[0], dateArr[1], dateArr[2]);
  //     const elapsedMSec = today.getTime() - date.getTime();
  //     localStorage.setItem("period", parseInt(elapsedMSec / 1000 / 60 / 60 / 24));
  //   } else {
  //     const dateArr = localStorage.getItem("notiDate").split("-");
  //     const today = new Date();
  //     const date = new Date(dateArr[0], dateArr[1], dateArr[2]);
  //     const elapsedMSec = today.getTime() - date.getTime();
  //     localStorage.setItem("period", parseInt(elapsedMSec / 1000 / 60 / 60 / 24));
  //   }

  const isNotiUpdated = reactCookie.load("isNotiUpdated");
  return JSON.parse(isNotiUpdated);
};

export default CheckNotiUpdate;
