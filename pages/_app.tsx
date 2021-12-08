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

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const App = (props: MyAppProps) => {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const [themeLoaded, setThemeLoaded] = React.useState<boolean>(false);
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

  useEffect(() => {
    if (
      prefersDarkMode &&
      !!localStorage.getItem('RF_COLOR_SETTING') !== true
    ) {
      setMode('dark');
    }
  }, [prefersDarkMode]);

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    localStorage.setItem('RF_COLOR_SETTING', mode);
  }, [mode]);

  useEffect(() => {
    const colorSetting = localStorage.getItem('RF_COLOR_SETTING');
    if (colorSetting) setMode(colorSetting as PaletteMode);
    // this is a nasty hack to get round the dark theme flashing issue
    // if you have a better way please do tell
    setThemeLoaded(true);
  }, []);

  const theme = React.useMemo(() => createTheme(GetDesignTokens(mode)), [mode]);
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout loaded={themeLoaded} theme={theme}>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </CacheProvider>
  );
};

export default App;
