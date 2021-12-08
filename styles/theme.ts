import { PaletteMode } from '@mui/material';
import Styles from './styles';

const GetDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light' ? Styles.light : Styles.dark),
  },
});

export default GetDesignTokens;
