import React, { useState } from "react";
import type { ReactNode } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  alpha,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useMovieContext } from "../../context/MovieContext";
import { useAuth } from "../../context/AuthContext";
import Logo from "../ui/Logo";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import AuthDialog from "../ui/auth/AuthDialog";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor:
    theme.palette.mode === "dark"
      ? alpha(theme.palette.common.white, 0.15)
      : alpha(theme.palette.common.black, 0.1),
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? alpha(theme.palette.common.white, 0.25)
        : alpha(theme.palette.common.black, 0.15),
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

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useMovieContext();
  const {
    isAuthDialogOpen,
    closeAuthDialog,
    initialAuthTab,
    isAuthenticated,
    openAuthDialog,
    logout,
  } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navigateTo = (path: string) => {
    navigate(path);
    if (drawerOpen) {
      setDrawerOpen(false);
    }
  };

  const drawerContent = (
    <Box sx={{ width: 280, p: 2 }}>
      <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
        <Box sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          Movie Explorer
        </Box>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <List sx={{ py: 1 }}>
        <ListItem
          button
          onClick={() => navigateTo("/")}
          sx={{
            borderRadius: "8px",
            mb: 1.5,
            py: 1.2,
            "&:hover": {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
            },
          }}
        >
          <ListItemText
            primary="Home"
            primaryTypographyProps={{
              fontSize: "1rem",
              fontWeight: 500,
            }}
          />
        </ListItem>
        <ListItem
          button
          onClick={() => navigateTo("/movies")}
          sx={{
            borderRadius: "8px",
            mb: 1.5,
            py: 1.2,
            "&:hover": {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
            },
          }}
        >
          <ListItemText
            primary="Browse Movies"
            primaryTypographyProps={{
              fontSize: "1rem",
              fontWeight: 500,
            }}
          />
        </ListItem>
        <ListItem
          button
          onClick={() => navigateTo("/trending")}
          sx={{
            borderRadius: "8px",
            mb: 1.5,
            py: 1.2,
            "&:hover": {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
            },
          }}
        >
          <ListItemText
            primary="Trending"
            primaryTypographyProps={{
              fontSize: "1rem",
              fontWeight: 500,
            }}
          />
        </ListItem>{" "}
        {isAuthenticated ? (
          <>
            <ListItem
              button
              onClick={() => navigateTo("/profile")}
              sx={{
                borderRadius: "8px",
                mb: 1.5,
                py: 1.2,
                "&:hover": {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              <ListItemText
                primary="My Profile"
                primaryTypographyProps={{
                  fontSize: "1rem",
                  fontWeight: 500,
                }}
              />
            </ListItem>
            <ListItem
              button
              onClick={() => navigateTo("/watchlist")}
              sx={{
                borderRadius: "8px",
                mb: 1.5,
                py: 1.2,
                "&:hover": {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              <ListItemText
                primary="My Watchlist"
                primaryTypographyProps={{
                  fontSize: "1rem",
                  fontWeight: 500,
                }}
              />
            </ListItem>
            <ListItem
              button
              onClick={logout}
              sx={{
                borderRadius: "8px",
                mb: 1.5,
                py: 1.2,
                px: 2,
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.12),
                "&:hover": {
                  bgcolor: (theme) => alpha(theme.palette.error.main, 0.25),
                },
              }}
            >
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{
                  color: "error",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                }}
              />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem
              button
              onClick={() => openAuthDialog("login")}
              sx={{
                borderRadius: "8px",
                mb: 1.5,
                py: 1.2,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                "&:hover": {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
                },
              }}
            >
              <ListItemText
                primary="Log in"
                primaryTypographyProps={{
                  fontSize: "1rem",
                  fontWeight: 500,
                }}
              />
            </ListItem>
            <ListItem
              button
              onClick={() => openAuthDialog("register")}
              sx={{
                borderRadius: "8px",
                mb: 1.5,
                py: 1.2,
                bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.1),
                "&:hover": {
                  bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.2),
                },
              }}
            >
              <ListItemText
                primary="Register"
                primaryTypographyProps={{
                  fontSize: "1rem",
                  fontWeight: 500,
                }}
              />
            </ListItem>
          </>
        )}
      </List>
      <Divider />
      <Box sx={{ mt: 2 }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (searchQuery.trim()) {
              navigateTo(`/search?query=${encodeURIComponent(searchQuery)}`);
            }
          }}
          style={{ width: "100%" }}
        >
          <Search
            sx={{
              width: "100%",
              my: 1,
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <input
              style={{
                width: "100%",
                border: "none",
                background: "transparent",
                color: "inherit",
                padding: "10px 10px 10px 40px",
                outline: "none",
                fontSize: "16px", // More touch-friendly size
              }}
              placeholder="Search movies…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Search>
        </form>
      </Box>
    </Box>
  );
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleDrawerToggle={handleDrawerToggle}
      />{" "}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            borderRadius: "0 16px 16px 0",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            width: { xs: "85%", sm: 320 },
            padding: "0",
            overflowX: "hidden",
          },
        }}
      >
        {drawerContent}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: 0, sm: 0 }, // Remove padding as header is transparent
          position: "relative", // Added for proper stacking
          zIndex: 0, // Ensures content is below header
        }}
      >
        {children}
      </Box>
      <Footer />
      {/* Auth Dialog */}
      <AuthDialog
        open={isAuthDialogOpen}
        onClose={closeAuthDialog}
        initialTab={initialAuthTab}
      />
    </Box>
  );
};

export default MainLayout;
