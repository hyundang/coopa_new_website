import axios from "axios";
import cookie from "react-cookies";

function setToken(xAccessToken: string) {
  axios.defaults.headers["x-access-token"] = xAccessToken;

  // const expires = new Date();
  // expires.setDate(Date.now() + 1000 * 60 * 60 * 24);

  cookie.save("x-access-token", xAccessToken, {
    path: "/",
    // expires,
    httpOnly: process.env.NODE_ENV === "production", // dev/prod 에 따라 false / true 로 받게 했다.
  });
}

export { setToken };
