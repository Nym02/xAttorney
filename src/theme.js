import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#313C4E',
    },
    secondary: {
      main: '#c8ac48',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  overrides: {
    MuiInputLabel: {
      root: {
        color: '#c8ac48',
        '&$focused': {
          color: '#c8ac48',
        },
      },
    },
  },
});

export default theme;
