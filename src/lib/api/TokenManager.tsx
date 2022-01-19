import axios from "axios";
import cookie from "react-cookies";

function setToken(xAccessToken: string) {
  axios.defaults.headers["x-access-token"] = xAccessToken;

  // 만료일 설정, 쿠키 저장
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + Number(process.env.EXPIRE_YEAR));

  cookie.save("x-access-token", xAccessToken, {
    path: "/",
    expires,
    httpOnly: process.env.NODE_ENV === "production", // dev/prod 에 따라 false / true 로 받게 했다.
  });
}

export { setToken };
