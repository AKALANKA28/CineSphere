import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  IconButton,
  Avatar,
  useMediaQuery,
  Menu,
  MenuItem,
  Divider,
  InputBase,
  Paper,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import Logo from "./Logo";
import { useTheme as useMuiTheme } from "@mui/material/styles";

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
  const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      const encodedQuery = encodeURIComponent(searchQuery);
      navigate(`/search?query=${encodedQuery}`);
    }
  };

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

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
            ? "rgba(0,0,0,0.85)"
            : "rgba(255,255,255,0.85)"
          : mode === "light"
          ? "rgba(255, 255, 255, 0.37)" 
          : "transparent",
        backdropFilter: isScrolled
          ? "blur(10px)"
          : mode === "light"
          ? "blur(5px)"
          : "none",
        transition: "all 0.3s ease",
        boxShadow: isScrolled
          ? "0 2px 4px rgba(0,0,0,0.1)"
          : mode === "light"
          ? "0 1px 3px rgba(0,0,0,0.05)"
          : "none",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        color: isScrolled
          ? "text.primary"
          : mode === "dark"
          ? muiTheme.palette.common.white
          : muiTheme.palette.text.primary,
        height: { xs: "64px", sm: "auto" },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: "64px", sm: "64px" },
            justifyContent: "space-between",
            px: { xs: 1, sm: 2 },
          }}
        >
          {/* Left Section - Menu Icon and Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="medium"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ mr: 1, display: { xs: "flex", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ mr: 2, display: { xs: "none", sm: "block" } }}>
              <Logo />
            </Box>
            <Box sx={{ mr: 1, display: { xs: "block", sm: "none" } }}>
              <Logo variant="compact" />
            </Box>
          </Box>

          {/* Empty space to push content to right */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Right Section - Search Bar and Navigation */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Search Bar */}
            {!isMobile && (
              <form onSubmit={handleSearchSubmit}>
                <Paper
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "auto",
                    height: 40,
                    p: "2px 8px",
                    mr: 2,
                    borderRadius: 5,
                    bgcolor:
                      mode === "dark"
                        ? alpha(muiTheme.palette.common.white, 0.15)
                        : alpha(muiTheme.palette.common.black, 0.08),
                    "&:hover": {
                      bgcolor:
                        mode === "dark"
                          ? alpha(muiTheme.palette.common.white, 0.25)
                          : alpha(muiTheme.palette.common.black, 0.12),
                    },
                    boxShadow: "none",
                  }}
                >
                  <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                  <InputBase
                    placeholder="Search movies…"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    inputProps={{ "aria-label": "search movies" }}
                    sx={{
                      ml: 1,
                      flex: 1,
                      color: isScrolled
                        ? "inherit"
                        : mode === "dark"
                        ? muiTheme.palette.common.white
                        : muiTheme.palette.text.primary,
                      fontSize: "0.95rem",
                    }}
                  />
                </Paper>
              </form>
            )}

            {/* Navigation Links */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                mr: 2,
              }}
            >
              <Typography
                onClick={() => navigate("/movies")}
                sx={{
                  mx: 1.5,
                  cursor: "pointer",
                  textShadow:
                    !isScrolled && mode === "dark"
                      ? "0px 0px 4px rgba(0,0,0,0.7)"
                      : "none",
                  color: isScrolled
                    ? "inherit"
                    : mode === "dark"
                    ? muiTheme.palette.common.white
                    : muiTheme.palette.text.primary,
                  "&:hover": {
                    color: muiTheme.palette.secondary.main,
                  },
                  fontWeight: 500,
                  fontSize: "0.95rem",
                }}
              >
                Browse Movies
              </Typography>

              <Typography
                onClick={() => navigate("/trending")}
                sx={{
                  mx: 1.5,
                  cursor: "pointer",
                  textShadow:
                    !isScrolled && mode === "dark"
                      ? "0px 0px 4px rgba(0,0,0,0.7)"
                      : "none",
                  color: isScrolled
                    ? "inherit"
                    : mode === "dark"
                    ? muiTheme.palette.common.white
                    : muiTheme.palette.text.primary,
                  "&:hover": {
                    color: muiTheme.palette.secondary.main,
                  },
                  fontWeight: 500,
                  fontSize: "0.95rem",
                }}
              >
                Trending
              </Typography>

              {isAuthenticated && (
                <Typography
                  onClick={() => navigate("/watchlist")}
                  sx={{
                    mx: 1.5,
                    cursor: "pointer",
                    textShadow:
                      !isScrolled && mode === "dark"
                        ? "0px 0px 4px rgba(0,0,0,0.7)"
                        : "none",
                    color: isScrolled
                      ? "inherit"
                      : mode === "dark"
                      ? muiTheme.palette.common.white
                      : muiTheme.palette.text.primary,
                    "&:hover": {
                      color: muiTheme.palette.secondary.main,
                    },
                    fontWeight: 500,
                    fontSize: "0.95rem",
                  }}
                >
                  My Watchlist
                </Typography>
              )}
            </Box>

            {/* Mobile space */}
            <Box sx={{ flexGrow: 1, display: { md: "none" } }} />

            {/* Right Side - Auth Buttons */}
            {!isAuthenticated ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {!isSmallScreen && (
                  <>
                    <Typography
                      onClick={() => openAuthDialog("login")}
                      sx={{
                        cursor: "pointer",
                        mx: 1,
                        fontSize: "0.95rem",
                        textShadow:
                          !isScrolled && mode === "dark"
                            ? "0px 0px 4px rgba(0,0,0,0.7)"
                            : "none",
                        color: isScrolled
                          ? "inherit"
                          : mode === "dark"
                          ? muiTheme.palette.common.white
                          : muiTheme.palette.text.primary,
                        "&:hover": {
                          color: muiTheme.palette.secondary.main,
                        },
                        fontWeight: 500,
                      }}
                    >
                      Log in
                    </Typography>
                    <Typography
                      sx={{
                        mx: 0.5,
                        color: isScrolled
                          ? "text.secondary"
                          : mode === "dark"
                          ? alpha(muiTheme.palette.common.white, 0.7)
                          : alpha(muiTheme.palette.text.primary, 0.7),
                        fontWeight: "light",
                        fontSize: "0.95rem",
                      }}
                    >
                      |
                    </Typography>
                    <Typography
                      onClick={() => openAuthDialog("register")}
                      sx={{
                        cursor: "pointer",
                        mx: 1,
                        fontSize: "0.95rem",
                        fontWeight: 500,
                        textShadow:
                          !isScrolled && mode === "dark"
                            ? "0px 0px 4px rgba(0,0,0,0.7)"
                            : "none",
                        color: isScrolled
                          ? mode === "light"
                            ? muiTheme.palette.primary.dark
                            : "inherit"
                          : mode === "dark"
                          ? muiTheme.palette.common.white
                          : muiTheme.palette.primary.main,
                        "&:hover": {
                          color: muiTheme.palette.primary.main,
                        },
                      }}
                    >
                      Register
                    </Typography>
                  </>
                )}
                {isMobile && (
                  <IconButton
                    color="inherit"
                    aria-label="search"
                    onClick={() => handleDrawerToggle()}
                    size="medium"
                    sx={{ mr: 1 }}
                  >
                    <SearchIcon />
                  </IconButton>
                )}
                <IconButton
                  sx={{
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
              </Box>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  sx={{
                    mr: 2,
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
                  size="medium"
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
                {isMobile && (
                  <IconButton
                    color="inherit"
                    aria-label="search"
                    onClick={() => handleDrawerToggle()}
                    size="medium"
                    sx={{ mr: 1 }}
                  >
                    <SearchIcon />
                  </IconButton>
                )}
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor:
                          muiTheme.palette.mode === "dark"
                            ? muiTheme.palette.secondary.main
                            : muiTheme.palette.primary.main,
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                        },
                      }}
                    >
                      {user?.name?.charAt(0) || "U"}
                    </Avatar>
                    <Box
                      component="span"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        ml: 0.5,
                        color: isScrolled
                          ? "inherit"
                          : muiTheme.palette.common.white,
                      }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginTop: "2px" }}
                      >
                        <path
                          d="M7 10l5 5 5-5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Box>
                  </Box>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    PaperProps={{
                      elevation: 3,
                      sx: {
                        minWidth: "200px",
                        mt: 1.5,
                        overflow: "visible",
                        borderRadius: 1,
                        border: "1px solid",
                        borderColor: "divider",
                        boxShadow:
                          muiTheme.palette.mode === "dark"
                            ? "0 4px 12px rgba(0,0,0,0.3)"
                            : "0 4px 12px rgba(0,0,0,0.1)",
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                          borderLeft: "1px solid",
                          borderTop: "1px solid",
                          borderColor: "divider",
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <Box sx={{ p: 2, textAlign: "center" }}>
                      <Avatar
                        sx={{
                          width: 56,
                          height: 56,
                          mx: "auto",
                          mb: 1,
                          bgcolor:
                            muiTheme.palette.mode === "dark"
                              ? muiTheme.palette.secondary.main
                              : muiTheme.palette.primary.main,
                        }}
                      >
                        {user?.name?.charAt(0) || "U"}
                      </Avatar>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {user?.name || "User"}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {user?.email || ""}
                      </Typography>
                    </Box>
                    <Divider />
                    <MenuItem
                      onClick={() => {
                        navigate("/watchlist");
                        setAnchorEl(null);
                      }}
                      sx={{ py: 1.5 }}
                    >
                      <BookmarkBorderIcon
                        sx={{
                          mr: 1.5,
                          fontSize: "1.25rem",
                          color:
                            muiTheme.palette.mode === "dark"
                              ? "secondary.main"
                              : "primary.main",
                        }}
                      />
                      My Watchlist
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      onClick={() => {
                        logout();
                        setAnchorEl(null);
                      }}
                      sx={{ py: 1.5 }}
                    >
                      <LogoutIcon
                        sx={{
                          mr: 1.5,
                          fontSize: "1.25rem",
                          color: muiTheme.palette.error.main,
                        }}
                      />
                      Logout
                    </MenuItem>
                  </Menu>
                </Box>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
