import type { AppProps } from "next/app";
// recoil
import { RecoilRoot } from "recoil";
// style
import { ThemeProvider } from "styled-components";
import { theme } from "styles/theme";
import { GlobalStyle } from "styles/GlobalStyles";

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <GlobalStyle />
        <Component {...pageProps} />
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
