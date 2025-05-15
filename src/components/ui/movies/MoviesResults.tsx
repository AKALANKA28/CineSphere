import React from "react";
import {
  Box,
  Grid,
  CircularProgress,
  Typography,
  Alert,
  AlertTitle,
} from "@mui/material";
import type { Movie } from "../../../types/movie.types";
import MovieCard from "../MovieCard";
import LoadMoreButton from "../LoadMoreButton";

interface MoviesResultsProps {
  movies: Movie[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  hasMoreResults: boolean;
  onLoadMore: () => void;
}

const MoviesResults: React.FC<MoviesResultsProps> = ({
  movies,
  isLoading,
  isLoadingMore,
  error,
  hasMoreResults,
  onLoadMore,
}) => {
  if (isLoading && movies.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress size={40} />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Loading movies...
        </Typography>
      </Box>
    );
  }
  if (error) {
    return (
      <Alert
        severity="error"
        sx={(theme) => ({
          mb: 4,
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(211, 47, 47, 0.1)"
              : "rgba(211, 47, 47, 0.05)",
          "& .MuiAlert-icon": { color: "error.main" },
        })}
      >
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    );
  }

  if (movies.length === 0) {
    return (
      <Alert
        severity="info"
        sx={{
          mb: 4,
          backgroundColor: "rgba(33, 150, 243, 0.1)",
          "& .MuiAlert-icon": { color: "info.main" },
        }}
      >
        <AlertTitle>No Movies Found</AlertTitle>
        Try adjusting your search filters to find more movies.
      </Alert>
    );
  }

  return (
    <>
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={2.4}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
      {hasMoreResults && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5, mb: 3 }}>
          <LoadMoreButton
            onClick={onLoadMore}
            isLoading={isLoadingMore}
            text="Load More Movies"
          />
        </Box>
      )}
    </>
  );
};

export default MoviesResults;
