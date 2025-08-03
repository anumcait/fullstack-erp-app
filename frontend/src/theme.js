import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // blue
    },
    secondary: {
      main: '#dc004e', // pink
    },
    background: {
      default: '#f4f6f8',
    },
    text: {
      primary: '#000000',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial',
    fontSize: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // prevent uppercase
        },
      },
    },
  },
});

export default theme;
