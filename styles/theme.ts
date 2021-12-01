import { PaletteMode } from '@mui/material';
import { red, grey } from '@mui/material/colors';

const GetDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: red,
          default: red,
          background: {
            default: '#f8f8f8',
          },
          text: {
            primary: grey[900],
          },
        }
      : {
          // palette values for dark mode
          primary: red,
          default: red,
          background: {
            default: '#333',
          },
          text: {
            primary: '#fff',
          },
        }),
  },
});

export default GetDesignTokens;
