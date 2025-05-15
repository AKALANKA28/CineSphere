import React, { useState } from "react";
import { Box, Container, Typography, Grid, Button } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MovieCard from "../components/ui/MovieCard";
import LoadMoreButton from "../components/ui/common/LoadMoreButton";
import { useWatchlist } from "../context/WatchlistContext";
import type { Movie } from "../types/movie.types";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const WatchlistPage: React.FC = () => {
  const { watchlist } = useWatchlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [displayCount, setDisplayCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Redirect to home if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Function to handle showing more movies
  const handleLoadMore = () => {
    setIsLoadingMore(true);

    // Simulate loading delay
    setTimeout(() => {
      setDisplayCount((prev) => prev + 12);
      setIsLoadingMore(false);
    }, 800);
  };

  // Get the subset of movies to display
  const moviesToShow = watchlist.slice(0, displayCount);

  return (
    <Box sx={{ pt: 8, pb: 4 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
            My Watchlist
          </Typography>
        </Box>{" "}
        {watchlist.length === 0 ? (
          <Box
            sx={{
              p: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              bgcolor: "background.paper",
              boxShadow: 1,
              minHeight: "300px",
              textAlign: "center",
            }}
          >
            <BookmarkBorderIcon
              sx={{
                fontSize: 70,
                color: "text.secondary",
                mb: 2,
                opacity: 0.7,
              }}
            />
            <Typography
              variant="h5"
              color="text.primary"
              gutterBottom
              fontWeight="medium"
            >
              Your watchlist is empty
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: "600px" }}
            >
              Add movies to your watchlist to keep track of what you want to
              watch next. Find your next favorite movie by exploring our
              collection.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/movies")}
              size="large"
              sx={{ px: 4, py: 1.2 }}
            >
              Browse Movies
            </Button>
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {moviesToShow.map((movie: Movie) => (
                <Grid item key={movie.id} xs={12} sm={6} md={4} lg={2.4}>
                  <MovieCard movie={movie} />
                </Grid>
              ))}
            </Grid>{" "}
            {moviesToShow.length < watchlist.length && (
              <Box
                sx={{ display: "flex", justifyContent: "center", mt: 5, mb: 3 }}
              >
                <LoadMoreButton
                  onClick={handleLoadMore}
                  isLoading={isLoadingMore}
                  text="Load More Movies"
                  loadingText="Loading..."
                  size="large"
                />
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default WatchlistPage;
