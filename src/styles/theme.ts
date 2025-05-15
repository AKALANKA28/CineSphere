import { createTheme } from '@mui/material/styles';
import type { PaletteMode, Theme, ThemeOptions } from '@mui/material';

// Create a theme instance with the specified mode
export const createAppTheme = (mode: PaletteMode): Theme => {
  return createTheme(getDesignTokens(mode));
};

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  // Using MUI's default breakpoints for better compatibility
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#032541' : '#01b4e4',
      light: mode === 'light' ? '#1c4966' : '#4fc6ea',
      dark: mode === 'light' ? '#01192c' : '#0099c8',
      contrastText: '#ffffff',
    },    secondary: {
      main: mode === 'light' ? '#b2070f' : '#e52a33',
      light: mode === 'light' ? '#d4383e' : '#ff5c63',
      dark: mode === 'light' ? '#8c0000' : '#a80000',
      contrastText: '#ffffff',
    },
    background: {
      default: mode === 'light' ? '#f8f8f8' : '#121212',
      paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
    },
    text: {
      primary: mode === 'light' ? '#333333' : '#ffffff',
      secondary: mode === 'light' ? '#5a5a5a' : '#b0b0b0',
    },
    action: {
      active: mode === 'light' ? 'rgba(0, 0, 0, 0.54)' : 'rgba(255, 255, 255, 0.7)',
      hover: mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.08)',
    }
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
      '@media (min-width:1920px)': {
        fontSize: '3rem',
      },
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      '@media (max-width:600px)': {
        fontSize: '1.75rem',
      },
      '@media (min-width:1920px)': {
        fontSize: '2.5rem',
      },
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
      '@media (min-width:1920px)': {
        fontSize: '2.25rem',
      },
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
      '@media (min-width:1920px)': {
        fontSize: '2rem',
      },
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      '@media (min-width:1920px)': {
        fontSize: '1.5rem',
      },
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      '@media (min-width:1920px)': {
        fontSize: '1.25rem',
      },
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
      '@media (min-width:1920px)': {
        fontSize: '1.1rem',
      },
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      '@media (min-width:1920px)': {
        fontSize: '1rem',
      },
    },
    body1: {
      fontSize: '1rem',
      '@media (min-width:1920px)': {
        fontSize: '1.1rem',
      },
    },
    body2: {
      fontSize: '0.875rem',
      '@media (min-width:1920px)': {
        fontSize: '1rem',
      },
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: mode === 'light' 
            ? '0px 2px 8px rgba(0, 0, 0, 0.1)'
            : '0px 2px 8px rgba(0, 0, 0, 0.5)',
          transition: 'all 0.3s ease-in-out',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          color: 'inherit',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: mode === 'light' ? 'inherit' : '#ffffff',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: mode === 'light' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: mode === 'light' ? '#032541' : '#01b4e4',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
        },
      },
    },
  },
});

// Default light theme
const theme = createAppTheme('light');
export default theme;
