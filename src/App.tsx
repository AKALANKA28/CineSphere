import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { MovieProvider } from "./context/MovieContext";
import { ThemeProvider } from "./context/ThemeContext";
import { WatchlistProvider } from "./context/WatchlistContext";
import { AuthProvider } from "./context/AuthContext";
import { SearchHistoryProvider } from "./context/SearchHistoryContext";
import { useTheme } from "./context/ThemeContext";
import { createAppTheme } from "./styles/theme";
import MainLayout from "./components/layout/MainLayout";
import ProfileWrapper from "./pages/ProfileWrapper";

// Pages
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import MoviesListPage from "./pages/MoviesListPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import TrendingPage from "./pages/TrendingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";

// Wrapper component that uses the theme context
const AppWithTheme = () => {
  const { mode } = useTheme();
  const theme = createAppTheme(mode);

  // Apply some base HTML/body styles based on theme
  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
    document.body.style.color = theme.palette.text.primary;

    // Add a class to the HTML element for potential global CSS theming
    document.documentElement.className =
      mode === "dark" ? "dark-theme" : "light-theme";
  }, [mode, theme]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <MovieProvider>
        <AuthProvider>
          <WatchlistProvider>
            <SearchHistoryProvider>
              <Router>
                <MainLayout>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/movies" element={<MoviesPage />} />
                    <Route
                      path="/movies/:category"
                      element={<MoviesListPage />}
                    />
                    <Route path="/movie/:id" element={<MovieDetailsPage />} />
                    <Route path="/search" element={<SearchResultsPage />} />
                    <Route path="/trending" element={<TrendingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/profile" element={<ProfileWrapper />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </MainLayout>
              </Router>
            </SearchHistoryProvider>
          </WatchlistProvider>
        </AuthProvider>
      </MovieProvider>
    </MuiThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppWithTheme />
    </ThemeProvider>
  );
}

export default App;
