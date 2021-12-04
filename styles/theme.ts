import { PaletteMode } from '@mui/material';
import { grey, green } from '@mui/material/colors';

const GetDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: green,
          default: green,
          background: {
            default: '#f8f8f8',
          },
          text: {
            primary: grey[900],
          },
        }
      : {
          // palette values for dark mode
          primary: grey,
          default: green,
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
