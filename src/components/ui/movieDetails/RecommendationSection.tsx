import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import type { Movie } from "../../../types/movie.types";

interface RecommendationSectionProps {
  recommendedMovies: Movie[];
  recommendedPage: number;
  moviesItemsPerPage: { xs: number; sm: number; md: number };
  handleRecommendedPrev: () => void;
  handleRecommendedNext: () => void;
  navigateToMovie: (id: number) => void;
}

const RecommendationSection: React.FC<RecommendationSectionProps> = ({
  recommendedMovies,
  recommendedPage,
  moviesItemsPerPage,
  handleRecommendedPrev,
  handleRecommendedNext,
  navigateToMovie,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Calculate how many cards to slide based on screen size
  const itemsPerSlide = moviesItemsPerPage.md;

  const handleSlide = (direction: "prev" | "next") => {
    if (containerRef.current) {
      const cardWidth =
        containerRef.current.querySelector(".movie-card")?.clientWidth || 220;
      const gap = 24; // Gap between cards (3 * 8px from MUI spacing)
      const scrollAmount = (cardWidth + gap) * itemsPerSlide;

      if (direction === "prev") {
        containerRef.current.scrollLeft -= scrollAmount;
        if (handleRecommendedPrev) handleRecommendedPrev();
      } else {
        containerRef.current.scrollLeft += scrollAmount;
        if (handleRecommendedNext) handleRecommendedNext();
      }
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 500 }}>
          You Might Like
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Button
            onClick={() => handleSlide("prev")}
            disabled={recommendedPage === 0}
            sx={{
              minWidth: 40,
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "white",
              mr: 1,
              "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
              "&.Mui-disabled": { color: "rgba(255,255,255,0.3)" },
            }}
          >
            <NavigateBeforeIcon />
          </Button>
          <Button
            onClick={() => handleSlide("next")}
            sx={{
              minWidth: 40,
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "white",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
              "&.Mui-disabled": { color: "rgba(255,255,255,0.3)" },
            }}
          >
            <NavigateNextIcon />
          </Button>
        </Box>
      </Box>
      <Box sx={{ position: "relative", minHeight: "400px" }}>
        {recommendedMovies.length > 0 ? (
          <Box
            ref={containerRef}
            sx={{
              display: "flex",
              overflowX: "auto",
              gap: 3,
              pb: 2,
              scrollBehavior: "smooth",
              msOverflowStyle: "none" /* IE and Edge */,
              scrollbarWidth: "none" /* Firefox */,
              "&::-webkit-scrollbar": {
                display: "none" /* Chrome, Safari, Opera */,
              },
            }}
          >
            {recommendedMovies.map((movie) => (
              <Box
                key={movie.id}
                className="movie-card"
                sx={{
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                  width: {
                    xs: "160px",
                    sm: "180px",
                    md: "200px",
                    lg: "220px",
                  },
                  flexShrink: 0,
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
                  <Typography variant="body2">
                    {movie.vote_average.toFixed(1)}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)" }}>
            No recommendations available.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default RecommendationSection;
