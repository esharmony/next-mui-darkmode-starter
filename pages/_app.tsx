import React, { useLayoutEffect, useRef, useEffect } from 'react';
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
import { useCookies, CookiesProvider, Cookies } from 'react-cookie';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  color: string;
}

const App = (props: MyAppProps) => {
  const [cookies, setCookie] = useCookies(['cookieColorMode']);
  const [mode, setMode] = React.useState<PaletteMode>('light');
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

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const canUseDOM = !!(
    typeof window !== 'undefined' &&
    typeof window.document !== 'undefined' &&
    typeof window.document.createElement !== 'undefined'
  );

  const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    if (prefersDarkMode && !!cookies.cookieColorMode !== true) {
      setMode('dark');
    } else {
      const colorSetting = cookies.cookieColorMode;
      if (colorSetting) setMode(colorSetting as PaletteMode);
    }
  }, [prefersDarkMode]);

  const firstUpdate = useRef(true);
  useIsomorphicLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setCookie('cookieColorMode', mode);
  }, [mode]);

  const theme = React.useMemo(() => createTheme(GetDesignTokens(mode)), [mode]);
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const isBrowser = typeof window !== 'undefined';
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{props.color}</title>
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
