import React from "react";
import { Box, useTheme, alpha } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { Movie } from "../../../../types/movie.types";

const MovieCardWrapper = styled(Box)(() => ({
  flexShrink: 0,
  borderRadius: "8px",
  overflow: "hidden",
  cursor: "pointer",
}));

interface HeroMovieCardProps {
  movie: Movie;
  isSelected: boolean;
  onSelect: (movie: Movie) => void;
  isMobile: boolean;
  isTablet: boolean;
}

const HeroMovieCard: React.FC<HeroMovieCardProps> = ({
  movie,
  isSelected,
  onSelect,
  isMobile,
  isTablet,
}) => {
  const theme = useTheme();

  const getCardWidth = (isSelected: boolean) => {
    if (isMobile) return isSelected ? "75vw" : "70vw";
    if (isTablet) return isSelected ? "calc(28% - 12px)" : "calc(25% - 12px)";
    return isSelected ? "calc(14% - 14px)" : "calc(12.5% - 14px)";
  };

  const getCardHeight = (isSelected: boolean) => {
    if (isMobile) return isSelected ? "170px" : "160px";
    if (isTablet) return isSelected ? "190px" : "180px";
    return isSelected ? "230px" : "210px";
  };

  return (
    <MovieCardWrapper
      data-movie-id={movie.id}
      onClick={() => onSelect(movie)}
      sx={{
        width: getCardWidth(isSelected),
        transition: "all 0.4s ease",
        scrollSnapAlign: isMobile ? "center" : "none",
        transform: isSelected ? "scale(1.1)" : "scale(1)",
        position: "relative",
        zIndex: isSelected ? 5 : 1,
        transformOrigin: "center center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: getCardHeight(isSelected),
          width: "100%",
          backgroundImage: `url(${
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "8px",
          transition: "all 0.4s ease",
          border: isSelected
            ? `3px solid ${theme.palette.primary.main}`
            : "1px solid rgba(255,255,255,0.2)",
          boxShadow: isSelected
            ? `0 0 25px ${alpha(theme.palette.primary.main, 0.8)}`
            : "none",
        }}
      />
    </MovieCardWrapper>
  );
};

export default HeroMovieCard;
