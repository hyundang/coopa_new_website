import type { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { theme } from "src/styles/theme";
import { GlobalStyle } from "src/styles/GlobalStyles";
import cookies from "next-cookies";
import { setToken } from "@api/TokenManager";
import getApi from "@api/getApi";
// import { useRouterLoading } from "src/hooks";
// import { useEffect } from "react";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          href="//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css"
          rel="stylesheet"
          type="text/css"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <title>쿠키파킹 | 성장하는 사람들의 가장 간편한 콘텐츠 파킹랏</title>
        <meta
          name="description"
          content="매일 새 탭에서 확인하는, All-in-one Web Clipping 서비스입니다. Cookieparking의 Chrome 확장 앱을 활용하면, 다양한 플랫폼에서 발견한 수많은 콘텐츠를 쉽고 빠르게 Web Clipping하고, 새 탭을 열 때마다 간편하게 확인할 수 있습니다. 브라우저의 새 탭은 업무 여정의 시작점입니다. 한 곳에 저장해뒀던 콘텐츠를, 새 탭을 열 때마다 잊지말고 확인해요! 매일 스쳐가는 콘텐츠가 내일의 확실한 영감이 될 수 있도록, 웹에서 발견한 콘텐츠들을 모아두고 정리해요."
        />
        <meta
          property="og:title"
          content="쿠키파킹 | 성장하는 사람들의 지식 습관"
        />
        <meta
          property="og:description"
          content="매일 새 탭에서 확인하는, All-in-one Web Clipping 서비스입니다. Cookieparking의 Chrome 확장 앱을 활용하면, 다양한 플랫폼에서 발견한 수많은 콘텐츠를 쉽고 빠르게 Web Clipping하고, 새 탭을 열 때마다 간편하게 확인할 수 있습니다. 브라우저의 새 탭은 업무 여정의 시작점입니다. 한 곳에 저장해뒀던 콘텐츠를, 새 탭을 열 때마다 잊지말고 확인해요! 매일 스쳐가는 콘텐츠가 내일의 확실한 영감이 될 수 있도록, 웹에서 발견한 콘텐츠들을 모아두고 정리해요."
        />
        <meta property="og:site_name" content="cookieparking" />
        <meta
          property="og:image"
          content="https://coopa-default.s3.ap-northeast-2.amazonaws.com/og_thumbnail.png"
        />
        <meta property="og:url" content="https://www.cookieparking.com" />
        <meta
          name="twitter:title"
          content="쿠키파킹 | 성장하는 사람들의 가장 간편한 콘텐츠 파킹랏"
        />
        <meta
          name="twitter:description"
          content="매일 새 탭에서 확인하는, All-in-one Web Clipping 서비스입니다. Cookieparking의 Chrome 확장 앱을 활용하면, 다양한 플랫폼에서 발견한 수많은 콘텐츠를 쉽고 빠르게 Web Clipping하고, 새 탭을 열 때마다 간편하게 확인할 수 있습니다. 브라우저의 새 탭은 업무 여정의 시작점입니다. 한 곳에 저장해뒀던 콘텐츠를, 새 탭을 열 때마다 잊지말고 확인해요! 매일 스쳐가는 콘텐츠가 내일의 확실한 영감이 될 수 있도록, 웹에서 발견한 콘텐츠들을 모아두고 정리해요."
        />
        <meta
          name="twitter:image"
          content="https://coopa-default.s3.ap-northeast-2.amazonaws.com/og_thumbnail.png"
        />
        <meta name="twitter:url" content="https://www.cookieparking.com" />
      </Head>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <GlobalStyle />
          {/* {isLoading ? (
            <h1 style={{ fontSize: "100px" }}>...loading</h1>
          ) : ( */}
          <Component {...pageProps} />
          {/* )} */}
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
}

export default App;

App.getInitialProps = async ({ ctx, Component }: AppContext) => {
  // 토큰
  const allCookies = cookies(ctx);
  const userToken = allCookies["x-access-token"];

  // 로그인 되어있을 때
  if (userToken !== undefined) {
    setToken(userToken);

    // 유저 데이터
    const initUserData = await getApi.getUserData("/users");

    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps: { ...pageProps, initUserData } };
  }
  // 로그인 안 되어 있을 때
  const pageProps = {};
  return {
    pageProps,
  };
};
