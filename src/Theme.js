import { createTheme } from '@mui/material';

export const mentorTheme = createTheme({
  typography: {
    fontFamily: '"Red Hat Text", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.488rem',
    },
    // h3: {
    //   fontSize: '',
    // },
    // h4: {
    //   fontSize: '',
    // },
    // h5: {
    //   fontSize: '',
    // },
    // h6: {
    //   fontSize: '',
    // },
    body1: {
      fontSize: '1.5rem',
    },
    body2: {
      fontSize: '1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});
