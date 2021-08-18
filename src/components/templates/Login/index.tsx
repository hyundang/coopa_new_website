import React from "react";
import styled from "styled-components";
// assets
import { LogoImg } from "@assets/imgs/common";
import { LoginImg } from "@assets/imgs/login";
// components
import { LoginBtn } from "@components/atoms";
// google login
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

export interface LoginProps {
  onSuccess: (
    response: GoogleLoginResponse | GoogleLoginResponseOffline,
  ) => void;
  onFailure: (error: any) => void;
}
const Login = ({ onSuccess, onFailure }: LoginProps) => {
  return (
    <Container>
      <LogoImg className="logo" role="img" />
      <main className="login">
        <h1 className="login__content">
          {"성장하는 사람들을 위한\n가장 간편한 콘텐츠 파킹랏"}
        </h1>
        <GoogleLogin
          clientId={String(process.env.REACT_APP_CLIENTID)}
          responseType="id_token"
          render={(renderProps: {
            onClick: React.MouseEventHandler<HTMLDivElement>;
          }) => <LoginBtn onClick={renderProps.onClick} />}
          onSuccess={onSuccess}
          onFailure={onFailure}
        />
        <h3 className="login__policy">
          {
            "로그인은 개인 정보 보호 정책 및 서비스 약관에 동의하는 것을 의미하며,\n서비스 이용을 위해 이메일과 이름, 프로필 이미지를 수집합니다."
          }
        </h3>
      </main>
      <LoginImg className="login_img" role="img" />
    </Container>
  );
};

export default Login;

const Container = styled.section`
  position: absolute;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  .logo {
    position: absolute;
    top: 2rem;
    left: 50%;
    transform: translate(-50%, 0);
    width: 16.3rem;
    height: 3rem;
  }

  .login {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 31.3rem;
    @media screen and (min-width: 769px) and (max-width: 1599px) {
      width: 43rem;
    }
    @media screen and (min-width: 1600px) {
      width: 47.3rem;
    }
    &__content {
      font-weight: 700;
      font-size: 2.6rem;
      line-height: 3.9rem;
      white-space: pre-line;
      text-align: center;
      @media screen and (min-width: 769px) and (max-width: 1599px) {
        font-size: 4rem;
        line-height: 5.8rem;
      }
      @media screen and (min-width: 1600px) {
        font-size: 4.4rem;
        line-height: 6.4rem;
      }
    }
    &__policy {
      margin-top: 2.8rem;
      color: #777777;
      font-style: normal;
      font-weight: 400;
      font-size: 1.1rem;
      line-height: 1.8rem;
      text-align: center;
      white-space: pre-line;
      @media screen and (min-width: 769px) {
        font-size: 1.3rem;
        line-height: 2rem;
      }
    }
  }

  .login_img {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    width: 32rem;
    height: 15.7rem;
    @media screen and (min-width: 769px) and (max-width: 1599px) {
      width: 49rem;
      height: 24rem;
    }
    @media screen and (min-width: 1600px) {
      width: 54rem;
      height: 26.4rem;
    }
  }
`;
