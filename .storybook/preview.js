export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      // Array of plain string values or MenuItem shape (see below)
      items: ['light', 'dark'],
      // Property that specifies if the name of the item will be displayed
      showName: true,
    },
  },
};

import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { createTheme } from '@mui/material';
import GetDesignTokens from '../styles/theme';

const withThemeProvider = (Story, context) => {
  const theme = createTheme(GetDesignTokens(context.globals.theme));
  // below the storybook background is set to the theme background
  document.body.style.backgroundColor = theme.palette.background.default;
  // set background on the storybook docs tab (this is done once the markup has been appended, I had to check for the occurance of this before changing the background, there maybe a better way )
  const targetNode = document.body;
  const config = { childList: true, subtree: true };
  const callback = function (mutationsList, observer) {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        if (document.getElementsByClassName('docs-story')[0]) {
          const docs = document.getElementsByClassName('docs-story')[0];
          docs.firstChild.style.backgroundColor =
            theme.palette.background.default;
        }
      }
    }
  };
  let observer;
  if (observer === undefined) {
    observer = new MutationObserver(callback);
    observer.observe(targetNode, config); // end of setting background on docs
  }

  return (
    <EmotionThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    </EmotionThemeProvider>
  );
};

export const decorators = [withThemeProvider];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
