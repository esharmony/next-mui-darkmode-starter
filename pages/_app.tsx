import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../lib/createEmotionCache';
import { createTheme, PaletteMode, useMediaQuery } from '@mui/material';
import GetDesignTokens from '../styles/theme';
import Layout from '../components/layout';
import ColorModeContext from '../contexts/colorModeContext';
import { parseCookies } from '../helpers';
import { Cookies, CookiesProvider, useCookies } from 'react-cookie';
import { NextPageContext } from 'next';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  themeSetting: PaletteMode;
}

const App = (props: MyAppProps) => {
  const [mode, setMode] = React.useState<PaletteMode>(
    props.themeSetting || 'light'
  );
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light'
        );
      },
    }),
    []
  );
  const [cookies, setCookie] = useCookies(['cookieColorMode']);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const isBrowser = typeof window !== 'undefined';

  const addDays = (date: Date, days: number) => {
    const copy = new Date(Number(date));
    copy.setDate(date.getDate() + days);
    return copy;
  };

  useEffect(() => {
    if (prefersDarkMode && !!cookies.cookieColorMode !== true) {
      setMode('dark');
    }
  }, [prefersDarkMode, cookies.cookieColorMode]);

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const date = new Date();
    const expires = addDays(date, 365);
    setCookie('cookieColorMode', mode, { path: '/', expires, secure: true });
  }, [mode, setCookie]);

  useEffect(() => {
    const colorSetting = cookies.cookieColorMode;
    if (colorSetting) setMode(colorSetting as PaletteMode);
  }, [cookies.cookieColorMode]);

  const theme = React.useMemo(() => createTheme(GetDesignTokens(mode)), [mode]);
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Home of Lizards</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <CookiesProvider
              cookies={isBrowser ? undefined : new Cookies(cookies)}
            >
              <Component {...pageProps} />
            </CookiesProvider>
          </Layout>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </CacheProvider>
  );
};

export default App;

App.getInitialProps = async (ctx: NextPageContext) => {
  let themeSetting;
  if (ctx.req && ctx.req.headers.cookie) {
    const { req } = ctx;
    themeSetting = parseCookies(req).cookieColorMode;
  }
  return {
    themeSetting,
  };
};
