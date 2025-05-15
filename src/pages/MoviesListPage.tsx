import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Alert,
  AlertTitle,
  CircularProgress,
  Button,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { getMoviesByEndpoint } from "../api/movieApi";
import type { Movie } from "../types/movie.types";
import MovieCard from "../components/ui/MovieCard";

// Map of endpoints to page titles
const categoryTitles: Record<string, string> = {
  popular: "Popular Movies",
  top_rated: "Top Rated Movies",
  upcoming: "Upcoming Movies",
  now_playing: "Now Playing Movies",
};

const MoviesListPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const endpoint = category || "popular"; // Default to popular if no category is provided

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const pageTitle = categoryTitles[endpoint] || "Movies"; // Get title from map or default to "Movies"

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getMoviesByEndpoint(endpoint);
        setMovies(data.results);
      } catch (err) {
        setError("Failed to load movies");
        console.error(`Error fetching ${endpoint} movies:`, err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
    // Reset display count when category changes
    setDisplayCount(12);
  }, [endpoint]);

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
  const moviesToShow = movies.slice(0, displayCount);

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
            {pageTitle}
          </Typography>
        </Box>

        {isLoading && movies.length === 0 ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress size={40} />
            <Typography variant="body1" sx={{ ml: 2 }}>
              Loading {pageTitle.toLowerCase()}...
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
            </Grid>

            {moviesToShow.length < movies.length && (
              <Box
                sx={{ display: "flex", justifyContent: "center", mt: 5, mb: 3 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={isLoadingMore}
                  onClick={handleLoadMore}
                  startIcon={
                    isLoadingMore ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <MoreHorizIcon />
                    )
                  }
                  sx={{ px: 4, py: 1.2 }}
                >
                  {isLoadingMore ? "Loading..." : "Load More Movies"}
                </Button>
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default MoviesListPage;
