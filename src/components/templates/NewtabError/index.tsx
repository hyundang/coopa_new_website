// components
import { Btn } from "@components/atoms";
import { Empty, Footer, Header } from "@components/organisms";
import { Homeboard } from "@components/templates";
// interfaces
import { BookmarkDataProps } from "@interfaces/homeboard";
// asset
import { RefreshIcon } from "@assets/icons/error";
import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/dist/client/router";
import { CookieIcon } from "@assets/icons/common";

export interface NewtabErrorProps {
  /** 프로필 이미지 url */
  imgUrl?: string;
  /** 홈보드 배경 이미지 */
  homeboardImg: string;
  /** bookmark data list */
  bookmarkDatas: BookmarkDataProps[];
  /** error img */
  errorImg: string;
  /** error img width */
  errorImgWidth: number;
  /** error text */
  text: string;
  text2: string;
  /** 로그인 에러 여부 */
  isLoginError?: boolean;
}
const NewtabError = ({
  imgUrl,
  homeboardImg,
  bookmarkDatas,
  errorImg,
  errorImgWidth,
  text,
  text2,
  isLoginError = false,
}: NewtabErrorProps) => {
  // onboarding
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <Header
        className="header"
        imgUrl={imgUrl}
        isErrorpage
        isOnboardOpen={isOnboardingOpen}
        setIsOnboardOpen={setIsOnboardingOpen}
      />
      <Container className="container">
        <Homeboard homeboardImg={homeboardImg} bookmarkDatas={bookmarkDatas} />
        <main className="error-view">
          <Empty
            className="error"
            img={errorImg}
            imgWidth={errorImgWidth}
            text={text}
            text2={text2}
            Btn={
              <Btn
                className="button"
                isAtvBtn
                isOrange
                onClick={
                  isLoginError
                    ? () => router.push("/login")
                    : () => window.location.reload()
                }
              >
                {isLoginError ? (
                  <CookieIcon className="button-icon" />
                ) : (
                  <RefreshIcon className="button-icon" />
                )}
                {isLoginError ? "로그인하기" : "재시도하기"}
              </Btn>
            }
          />
        </main>
      </Container>
      <Footer />
    </>
  );
};

export default NewtabError;

const Container = styled.div`
  width: 100%;
  padding-top: 60px;
  padding-bottom: 130px;

  .error-view {
    .error {
      padding-top: 140px;
    }
  }

  .button {
    width: 196px;
    height: 56px;
    border-radius: 29px;
    font-size: 16px;
    line-height: 20px;

    .button-icon {
      width: 16px;
      height: 16px;
      margin-right: 11px;
    }
  }
`;
