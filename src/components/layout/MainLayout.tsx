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
  const { isAuthDialogOpen, closeAuthDialog, initialAuthTab, isAuthenticated, openAuthDialog, logout } = useAuth();
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
    <Box sx={{ width: 250, p: 2 }}>
      <Box sx={{ my: 2 }}>
        <Logo />
      </Box>
      <Divider />
      <List>
        <ListItem button onClick={() => navigateTo("/")}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => navigateTo("/movies")}>
          <ListItemText primary="Browse Movies" />
        </ListItem>
        <ListItem button onClick={() => navigateTo("/trending")}>
          <ListItemText primary="Trending" />
        </ListItem>

        {isAuthenticated ? (
          <>
            <ListItem button onClick={() => navigateTo("/profile")}>
              <ListItemText primary="My Profile" />
            </ListItem>
            <ListItem button onClick={logout}>
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{ color: "error" }}
              />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button onClick={() => openAuthDialog('login')}>
              <ListItemText primary="Log in" />
            </ListItem>
            <ListItem button onClick={() => openAuthDialog('register')}>
              <ListItemText primary="Register" />
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
          <Search sx={{ width: "100%", my: 1 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <input
              style={{
                width: "100%",
                border: "none",
                background: "transparent",
                color: "inherit",
                padding: "8px 8px 8px 40px",
                outline: "none",
              }}
              placeholder="Search movies…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Search>
        </form>
      </Box>
    </Box>
  );return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawerContent}
      </Drawer>{" "}
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
      </Box>      <Footer />
      
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
