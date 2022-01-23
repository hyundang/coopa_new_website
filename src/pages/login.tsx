/* global chrome */
import { useState, useEffect } from "react";
// components
import { Login } from "@components/templates";
// google login
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
// api
import { postApi } from "@lib/api";
import { CreateUserProps } from "@interfaces/user";
import { setToken } from "@api/TokenManager";

export default function LoginPage() {
  const filter: string =
    "win16|win32|win64|wince|mac|macintel|macppc|mac68k|linux i686|linux armv7l|hp-ux|sunos";
  const [isPC, setIsPC] = useState<boolean>(true);

  function instanceOfGLR(_object: any): _object is GoogleLoginResponse {
    return true;
  }
  // 로그인 성공 시
  const handleSuccess = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline,
  ) => {
    if (instanceOfGLR(response)) {
      const data: CreateUserProps = {
        name: response.profileObj.name,
        email: response.profileObj.email,
        googleId: response.profileObj.googleId,
        profileImage: response.profileObj.imageUrl,
      };

      const jwt = await postApi.postUserData(data);

      if (jwt) {
        // 쿠키에 유저 토큰 저장
        setToken(jwt);

        if (isPC) {
          chrome.runtime.sendMessage(
            CLIENT_ID,
            { isLogin: true, userToken: jwt },
            function (res: any) {
              if (!res.success) console.log("fail");
            },
          );
        }

        document.location.href = `${DOMAIN}`;
      } else {
        alert("로그인 실패");
      }
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
}
