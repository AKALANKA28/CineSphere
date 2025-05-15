export type ThemeMode = 'light' | 'dark';

export interface ThemeContextProps {
  mode: ThemeMode;
  toggleTheme: () => void;
}

export interface ResponsiveStyles {
  xs?: string | number;
  sm?: string | number;
  md?: string | number;
  lg?: string | number;
  xl?: string | number;
}
