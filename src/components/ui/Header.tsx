import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  IconButton,
  Avatar,
  Button,
  useMediaQuery,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import Logo from "./Logo";
import { useTheme as useMuiTheme } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleDrawerToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  handleDrawerToggle,
}) => {
  const navigate = useNavigate();
  const { mode, toggleTheme } = useTheme();
  const { isAuthenticated, logout, user, openAuthDialog } = useAuth();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      // Navigate first, then let the search page handle the search
      const encodedQuery = encodeURIComponent(searchQuery);
      navigate(`/search?query=${encodedQuery}`);
    }
  };
  const [isScrolled, setIsScrolled] = useState(false);
  // Detect scroll position for transparent header effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    // Initialize scroll state
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        background: isScrolled
          ? mode === "dark"
            ? "rgba(0,0,0,0.7)"
            : "rgba(255,255,255,0.7)"
          : "transparent",
        backdropFilter: isScrolled ? "blur(8px)" : "none",
        transition: "all 0.3s ease",
        boxShadow: "none",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        color: isScrolled ? "text.primary" : muiTheme.palette.common.white,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Left Side - Logo and Menu Icon */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>{" "}
          {/* Logo */}
          <Box sx={{ mr: 2, display: { xs: "none", sm: "block" } }}>
            <Logo />
          </Box>
          <Box sx={{ mr: 2, display: { xs: "block", sm: "none" } }}>
            <Logo variant="compact" />
          </Box>{" "}
          {/* Navigation Links */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Typography
              onClick={() => navigate("/movies")}
              sx={{
                mx: 2,
                cursor: "pointer",
                textShadow: !isScrolled
                  ? "0px 0px 4px rgba(0,0,0,0.7)"
                  : "none",
                color: isScrolled ? "inherit" : muiTheme.palette.common.white,
                "&:hover": {
                  color: muiTheme.palette.secondary.main,
                },
              }}
            >
              Browse Movies
            </Typography>
            <Typography
              onClick={() => navigate("/trending")}
              sx={{
                mx: 2,
                cursor: "pointer",
                textShadow: !isScrolled
                  ? "0px 0px 4px rgba(0,0,0,0.7)"
                  : "none",
                color: isScrolled ? "inherit" : muiTheme.palette.common.white,
                "&:hover": {
                  color: muiTheme.palette.secondary.main,
                },
              }}
            >
              Trending
            </Typography>
          </Box>
          {/* Search Bar */}
          {!isMobile && (
            <form
              onSubmit={handleSearchSubmit}
              style={{
                flexGrow: 0,
                marginRight: "16px",
              }}
            >
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search movies…"
                  inputProps={{ "aria-label": "search" }}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </Search>
            </form>
          )}          {/* Right Side - Auth Buttons */}
          {!isAuthenticated ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {" "}
              <Typography
                onClick={() => openAuthDialog('login')}
                sx={{
                  cursor: "pointer",
                  mx: 1,
                  fontSize: "0.9rem",
                  textShadow: !isScrolled
                    ? "0px 0px 4px rgba(0,0,0,0.7)"
                    : "none",
                  color: isScrolled ? "inherit" : muiTheme.palette.common.white,
                  "&:hover": {
                    color: muiTheme.palette.secondary.main,
                  },
                }}
              >
                Log in
              </Typography>
              <Typography
                sx={{
                  mx: 0.5,
                  color: isScrolled
                    ? "text.secondary"
                    : alpha(muiTheme.palette.common.white, 0.7),
                  fontWeight: "light",
                  fontSize: "0.9rem",
                }}
              >
                |
              </Typography>{" "}
              <Typography
                onClick={() => openAuthDialog('register')}
                sx={{
                  cursor: "pointer",
                  mx: 1,
                  fontSize: "0.9rem",
                  textShadow: !isScrolled
                    ? "0px 0px 4px rgba(0,0,0,0.7)"
                    : "none",
                  color: isScrolled ? "inherit" : muiTheme.palette.common.white,
                  "&:hover": {
                    color: muiTheme.palette.secondary.main,
                  },
                }}
              >
                Register
              </Typography>{" "}
              <IconButton
                sx={{
                  ml: 1,
                  bgcolor:
                    mode === "dark"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.08)",
                  "&:hover": {
                    bgcolor:
                      mode === "dark"
                        ? "rgba(255, 255, 255, 0.2)"
                        : "rgba(0, 0, 0, 0.15)",
                  },
                }}
                onClick={toggleTheme}
                color="inherit"
                aria-label={
                  mode === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
                size="small"
              >
                {mode === "dark" ? (
                  <Brightness7Icon fontSize="small" />
                ) : (
                  <Brightness4Icon fontSize="small" />
                )}
              </IconButton>
            </Box>          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {" "}
              <Typography
                onClick={() => navigate("/profile")}
                sx={{
                  cursor: "pointer",
                  mx: 1,
                  fontSize: "0.9rem",
                  "&:hover": {
                    color: "secondary.main",
                  },
                }}
              >
                My Profile
              </Typography>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  cursor: "pointer",
                  ml: 1,
                }}
                onClick={() => navigate("/profile")}
              >
                {user?.name?.charAt(0) || 'U'}
              </Avatar>
              <Button
                size="small"
                variant="text"
                onClick={logout}
                sx={{ ml: 2, fontSize: "0.75rem" }}
              >
                Logout
              </Button>{" "}
              <IconButton
                sx={{
                  ml: 1,
                  bgcolor:
                    mode === "dark"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.08)",
                  "&:hover": {
                    bgcolor:
                      mode === "dark"
                        ? "rgba(255, 255, 255, 0.2)"
                        : "rgba(0, 0, 0, 0.15)",
                  },
                }}
                onClick={toggleTheme}
                color="inherit"
                size="small"
                aria-label={
                  mode === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
              >
                {mode === "dark" ? (
                  <Brightness7Icon fontSize="small" />
                ) : (
                  <Brightness4Icon fontSize="small" />
                )}
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
