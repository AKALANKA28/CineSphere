import { createTheme } from '@mui/material/styles';
import type { PaletteMode, Theme, ThemeOptions } from '@mui/material';



// Create a theme instance with the specified mode
export const createAppTheme = (mode: PaletteMode): Theme => {
  return createTheme(getDesignTokens(mode));
};

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#b2070f' : '#e52a33',
      light: mode === 'light' ? '#d4383e' : '#ff5c63',
      dark: mode === 'light' ? '#8c0000' : '#a80000',
      contrastText: '#ffffff',
    },    
    secondary: {
      main: mode === 'light' ? '#b2070f' : '#e52a33',
      light: mode === 'light' ? '#d4383e' : '#ff5c63',
      dark: mode === 'light' ? '#8c0000' : '#a80000',
      contrastText: '#ffffff',
    },    
    background: {
      default: mode === 'light' ? '#ffffff' : '#121212',
      paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
    },    
    text: {
      primary: mode === 'light' ? '#000000' : '#ffffff',
      secondary: mode === 'light' ? '#333333' : '#b0b0b0',
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
  },  
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: mode === 'light' ? '#000000' : 'inherit',
        },
        h1: {
          color: mode === 'light' ? '#000000' : '#ffffff',
        },
        h2: {
          color: mode === 'light' ? '#000000' : '#ffffff',
        },
        h3: {
          color: mode === 'light' ? '#000000' : '#ffffff',
        },
        h4: {
          color: mode === 'light' ? '#000000' : '#ffffff',
        },
        h5: {
          color: mode === 'light' ? '#000000' : '#ffffff',
        },
        h6: {
          color: mode === 'light' ? '#000000' : '#ffffff',
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
        text: {
          color: mode === 'light' ? '#b2070f' : '#e52a33',
        },
      },
    },    
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: mode === 'light' 
            ? '0px 2px 12px rgba(0, 0, 0, 0.15)'
            : '0px 2px 8px rgba(0, 0, 0, 0.5)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: mode === 'light'
              ? '0px 4px 16px rgba(0, 0, 0, 0.2)'
              : '0px 4px 16px rgba(0, 0, 0, 0.6)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: 'none'
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
            borderColor: mode === 'light' ? '#b2070f' : '#e52a33',
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
    MuiTab: {
      styleOverrides: {
        root: {
          color: mode === 'light' ? 'rgba(0, 0, 0, 0.85)' : 'rgba(255, 255, 255, 0.85)',
          '&.Mui-selected': {
            color: mode === 'light' ? '#000000' : '#ffffff',
            fontWeight: 500,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: mode === 'light' ? '#b2070f' : '#e52a33',
          height: 3,
        },
      },
    },
  },
});

// Default dark theme (changed from light)
const theme = createAppTheme('dark');
export default theme;
