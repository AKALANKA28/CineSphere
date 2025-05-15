import React, { useState } from "react";
import type { ReactNode } from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Grid,
  Paper,
  Divider,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import HistoryIcon from "@mui/icons-material/History";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import SecurityIcon from "@mui/icons-material/Security";
import MovieCard from "../components/ui/MovieCard";
import { useNavigate } from "react-router-dom";
import { useMovieContext } from "../context/MovieContext";
import { useWatchlist } from "../context/WatchlistContext";
import type { Movie } from "../types/movie.types";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

function a11yProps(index: number) {
  return {
    id: `profile-tab-${index}`,
    "aria-controls": `profile-tabpanel-${index}`,
  };
}

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  border: `4px solid ${theme.palette.background.paper}`,
  boxShadow: theme.shadows[3],
  position: "relative",
}));

const ProfileCoverImage = styled(Box)(({ theme }) => ({
  height: 200,
  backgroundImage: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  marginBottom: -60,
}));

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { popularMovies } = useMovieContext();
  const { favorites, watchlist } = useWatchlist();
  const [tabValue, setTabValue] = useState(0);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Movie enthusiast and cinephile. I love sci-fi and drama films.",
  });

  // For watch history, we'll still use mock data since we don't track it yet
  const watchHistory = popularMovies.slice(12, 18);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEditDialogOpen = () => {
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated profile:", profileData);
    // In a real app, you'd send this to your backend API
    setEditDialogOpen(false);
  };

  const handleProfileFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleLogout = () => {
    // In a real app, you'd clear the auth token and user data
    console.log("Logging out...");
    navigate("/");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Paper sx={{ overflow: "hidden" }}>
        <ProfileCoverImage />
        <Box sx={{ px: { xs: 2, sm: 4 }, pb: 4 }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ProfileAvatar
                alt={profileData.name}
                src="/static/images/avatar/1.jpg"
              />
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="h5" fontWeight="bold">
                  {profileData.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  {profileData.email}
                </Typography>
              </Box>
              <Button
                startIcon={<EditIcon />}
                variant="outlined"
                size="small"
                sx={{ mt: 2 }}
                onClick={handleEditDialogOpen}
              >
                Edit Profile
              </Button>
              <Divider sx={{ my: 3, width: "100%" }} />

              <List sx={{ width: "100%" }}>
                <ListItem
                  button
                  selected={tabValue === 0}
                  onClick={() => setTabValue(0)}
                >
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile Overview" />
                </ListItem>
                <ListItem
                  button
                  selected={tabValue === 1}
                  onClick={() => setTabValue(1)}
                >
                  <ListItemIcon>
                    <FavoriteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Favorites" />
                </ListItem>
                <ListItem
                  button
                  selected={tabValue === 2}
                  onClick={() => setTabValue(2)}
                >
                  <ListItemIcon>
                    <BookmarkBorderIcon />
                  </ListItemIcon>
                  <ListItemText primary="Watchlist" />
                </ListItem>
                <ListItem
                  button
                  selected={tabValue === 3}
                  onClick={() => setTabValue(3)}
                >
                  <ListItemIcon>
                    <HistoryIcon />
                  </ListItemIcon>
                  <ListItemText primary="Watch History" />
                </ListItem>
                <ListItem
                  button
                  selected={tabValue === 4}
                  onClick={() => setTabValue(4)}
                >
                  <ListItemIcon>
                    <SecurityIcon />
                  </ListItemIcon>
                  <ListItemText primary="Account Settings" />
                </ListItem>
                <ListItem button onClick={handleLogout}>
                  <ListItemText
                    primary="Logout"
                    primaryTypographyProps={{ color: "error" }}
                  />
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={12} sm={8} md={9}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  aria-label="profile tabs"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab label="Overview" {...a11yProps(0)} />
                  <Tab label="Favorites" {...a11yProps(1)} />
                  <Tab label="Watchlist" {...a11yProps(2)} />
                  <Tab label="Watch History" {...a11yProps(3)} />
                  <Tab label="Account Settings" {...a11yProps(4)} />
                </Tabs>
              </Box>
              <TabPanel value={tabValue} index={0}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h6">About Me</Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      {profileData.bio}
                    </Typography>
                  </Grid>{" "}
                  <Grid item xs={12}>
                    <Typography variant="h6">Recent Favorites</Typography>{" "}
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      {favorites.slice(0, 5).map((movie: Movie) => (
                        <Grid
                          item
                          key={movie.id}
                          xs={12}
                          sm={6}
                          md={4}
                          lg={2.4}
                        >
                          <MovieCard movie={movie} />
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      Recently Added to Watchlist
                    </Typography>{" "}
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      {watchlist.slice(0, 5).map((movie: Movie) => (
                        <Grid
                          item
                          key={movie.id}
                          xs={12}
                          sm={6}
                          md={4}
                          lg={2.4}
                        >
                          <MovieCard movie={movie} />
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  My Favorite Movies
                </Typography>{" "}
                <Grid container spacing={2}>
                  {favorites.map((movie: Movie) => (
                    <Grid item key={movie.id} xs={12} sm={6} md={4} lg={2.4}>
                      <MovieCard movie={movie} />
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>{" "}
              <TabPanel value={tabValue} index={2}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  My Watchlist
                </Typography>{" "}
                <Grid container spacing={2}>
                  {watchlist.map((movie: Movie) => (
                    <Grid item key={movie.id} xs={12} sm={6} md={4} lg={2.4}>
                      <MovieCard movie={movie} />
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel value={tabValue} index={3}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Watch History
                </Typography>{" "}
                <Grid container spacing={2}>
                  {watchHistory.map((movie: Movie) => (
                    <Grid item key={movie.id} xs={12} sm={6} md={4} lg={2.4}>
                      <MovieCard movie={movie} />
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel value={tabValue} index={4}>
                <Typography variant="h6" sx={{ mb: 3 }}>
                  Account Settings
                </Typography>

                <Paper sx={{ p: 3 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Change Password
                  </Typography>
                  <Box component="form" sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="currentPassword"
                          label="Current Password"
                          type="password"
                          id="currentPassword"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="newPassword"
                          label="New Password"
                          type="password"
                          id="newPassword"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="confirmPassword"
                          label="Confirm New Password"
                          type="password"
                          id="confirmPassword"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button variant="contained" sx={{ mt: 1 }}>
                          Update Password
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>

                <Paper sx={{ p: 3, mt: 3 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ mb: 2 }}
                  >
                    Notification Settings
                  </Typography>
                  <Button variant="outlined" color="error">
                    Delete Account
                  </Button>
                </Paper>
              </TabPanel>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Edit Profile Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={handleEditDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
              value={profileData.name}
              onChange={handleProfileFieldChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={profileData.email}
              onChange={handleProfileFieldChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="bio"
              label="Bio"
              name="bio"
              multiline
              rows={4}
              value={profileData.bio}
              onChange={handleProfileFieldChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleProfileUpdate} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfilePage;
