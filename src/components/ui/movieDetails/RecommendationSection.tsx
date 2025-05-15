import React from "react";
import { Box, Container, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import MoviesCarousel from "../common/MoviesCarousel";
import type { Movie } from "../../../types/movie.types";

interface RecommendationSectionProps {
  recommendedMovies: Movie[];
  navigateToMovie: (id: number) => void;
}

const RecommendationSection: React.FC<RecommendationSectionProps> = ({
  recommendedMovies,
  navigateToMovie,
}) => {
  // Render a movie item for the carousel
  const renderMovieItem = (movie: Movie) => (
    <Box
      sx={{
        cursor: "pointer",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
      onClick={() => navigateToMovie(movie.id)}
    >
      <Box
        sx={{
          height: { xs: 240, sm: 270, md: 300, lg: 330 },
          borderRadius: 2,
          overflow: "hidden",
          mb: 1,
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}
      />
      <Typography
        variant="body1"
        sx={{
          fontWeight: 500,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {movie.title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        <StarIcon sx={{ color: "#f5c518", fontSize: "0.9rem" }} />
        <Typography variant="body2">{movie.vote_average.toFixed(1)}</Typography>
      </Box>
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 6, bgcolor: "background.default" }}>
      <MoviesCarousel
        title="You Might Like"
        items={recommendedMovies}
        renderItem={renderMovieItem}
      />
    </Container>
  );
};

export default RecommendationSection;
