/* global chrome */
import { useState, useEffect } from "react";
// components
import Login from "@components/templates/Login";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

const LoginPage = () => {
  const filter: string =
    "win16|win32|win64|wince|mac|macintel|macppc|mac68k|linux i686|linux armv7l|hp-ux|sunos";
  const [isPC, setIsPC] = useState<boolean>(true);

  function instanceOfGLR(object: any): object is GoogleLoginResponse {
    return true;
  }
  // 로그인 성공 시
  const handleSuccess = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline,
  ) => {
    if (instanceOfGLR(response)) {
      const token = {
        "x-access-token": response.accessToken,
      };

      const data = {
        name: response.profileObj.name,
        email: response.profileObj.email,
        googleId: response.profileObj.googleId,
        profileImage: response.profileObj.imageUrl,
      };

      // const Response = await postApi.postLogin(token, data);
      //   // 로컬 스토리지에 유저 토큰이랑 로그인 여부 저장
      //   localStorage.setItem("userToken", Response.data.jwt);
      //   localStorage.setItem("isLogin", true);

      //   if (isPC) {
      //     chrome.runtime.sendMessage(
      //       "gbpliecdabaekbhmncopnbkfpdippdnl",
      //       { isLogin: true, userToken: Response.data.jwt },
      //       function (response) {
      //         if (!response.success) console.log("fail");
      //       }
      //     );
      //   };

      //   window.open("https://www.cookieparking.com", "_self");
      console.log(token, data);
    }
  };

  // 로그인 실패 시
  const handleFailure = (error: any) => {
    console.log(error);
  };

  // 접속 기기 확인
  useEffect(() => {
    if (navigator.platform) {
      if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
        setIsPC(false);
      }
    }
  }, []);

  return <Login onSuccess={handleSuccess} onFailure={handleFailure} />;
};

export default LoginPage;
