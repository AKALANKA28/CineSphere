import React, { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import type { ThemeMode, ThemeContextProps } from "../types/theme.types";

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Get the initial theme from localStorage or use light as default
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem("themeMode");
    return (
      (savedMode as ThemeMode) ||
      (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  });

  // Update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
    // Apply a data attribute to the body for potential CSS usage
    document.body.dataset.theme = mode;
  }, [mode]);

  // Toggle between light and dark modes
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
