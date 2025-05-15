import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  Alert,
  AlertTitle,
  CircularProgress,
} from "@mui/material";
import MovieCard from "../components/ui/MovieCard";
import LoadMoreButton from "../components/ui/common/LoadMoreButton";
import { useMovieContext } from "../context/MovieContext";

const TrendingPage: React.FC = () => {
  const { trendingMovies, isLoading, error } = useMovieContext();
  const [displayCount, setDisplayCount] = useState(12); 
  const [isLoadingMore, setIsLoadingMore] = useState(false);
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
  const moviesToShow = trendingMovies.slice(0, displayCount);
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
            Trending Movies
          </Typography>
        </Box>{" "}
        {isLoading && trendingMovies.length === 0 ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress size={40} />
            <Typography variant="body1" sx={{ ml: 2 }}>
              Loading trending movies...
            </Typography>
          </Box>
        ) : error ? (
          <Alert
            severity="error"
            sx={{
              mb: 4,
              backgroundColor: "rgba(211, 47, 47, 0.1)",
              "& .MuiAlert-icon": { color: "error.main" },
            }}
          >
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        ) : (
          <>
            <Grid container spacing={3}>
              {moviesToShow.map((movie) => (
                <Grid item key={movie.id} xs={12} sm={6} md={4} lg={2.4}>
                  <MovieCard movie={movie} />
                </Grid>
              ))}
            </Grid>{" "}
            {moviesToShow.length < trendingMovies.length && (
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

export default TrendingPage;
