import {createTheme} from '@mui/material/styles';
import {red} from '@mui/material/colors';
import {lighten} from "@mui/material";

// Create a theme instance.
const theme = createTheme({
  palette: {
    background: {
      paper: '#ffffff',
      default: '#f5f6fa',
    },
    primary: {
      main: '#7c30d8',
      light: 'rgba(22,21,23,0.7)',
      dark: '#2e2e2e'
    },
    secondary: {
      main: '#feb95a',
    },
    error: {
      main: red.A400,
      light: lighten(red.A400, 0.7)
    },
  },
});

export default theme;
