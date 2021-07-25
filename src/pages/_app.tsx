import type { AppProps } from "next/app";
// recoil
import { RecoilRoot } from "recoil";
// style
import { ThemeProvider } from "styled-components";
import { theme } from "src/styles/theme";
import { GlobalStyle } from "src/styles/GlobalStyles";

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
