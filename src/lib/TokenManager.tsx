import SaveDataInWebCookie from "@lib/SaveDataInWebCookie";
import axios from "axios";

function setToken(xAccessToken: string) {
  axios.defaults.headers["x-access-token"] = xAccessToken;
  SaveDataInWebCookie("x-access-token", xAccessToken);
}

export { setToken };
