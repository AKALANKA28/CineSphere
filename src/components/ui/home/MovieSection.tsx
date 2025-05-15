import React, { useState, useEffect } from "react";
import { Typography, Box, Button, Grid } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";
import MovieCard from "../MovieCard";
import MovieSectionLoading from "./MovieSectionLoading";
import MovieSectionError from "./MovieSectionError";
import { getMoviesByEndpoint } from "../../../api/movieApi";
import type { Movie } from "../../../types/movie.types";

interface MovieSectionProps {
  title: string;
  endpoint: string;
  showMoreLink?: string;
}

const MovieSection: React.FC<MovieSectionProps> = ({
  title,
  endpoint,
  showMoreLink,
}) => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getMoviesByEndpoint(endpoint);
        setMovies(data.results.slice(0, 6));
      } catch (err) {
        setError("Failed to load movies");
        console.error("Error fetching movies:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [endpoint]);

  if (isLoading) {
    return <MovieSectionLoading />;
  }

  if (error) {
    return <MovieSectionError error={error} />;
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" component="h2" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        {showMoreLink && (
          <Button
            endIcon={<KeyboardArrowRightIcon />}
            onClick={() => navigate(showMoreLink)}
            sx={{ color: "text.secondary", fontSize: "0.9rem" }}
          >
            See All
          </Button>
        )}
      </Box>

      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={2}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MovieSection;
