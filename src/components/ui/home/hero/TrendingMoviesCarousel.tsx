import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";
import type { Movie } from "../../../../types/movie.types";
import HeroMovieCard from "./HeroMovieCard";

const CarouselButton = styled(IconButton)(() => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "white",
  zIndex: 2,
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
}));

interface TrendingMoviesCarouselProps {
  movies: Movie[];
  selectedMovieId: number | null;
  onMovieSelect: (movie: Movie) => void;
  carouselRef: React.RefObject<HTMLDivElement | null>;
}

const TrendingMoviesCarousel: React.FC<TrendingMoviesCarouselProps> = ({
  movies,
  selectedMovieId,
  onMovieSelect,
  carouselRef,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [showNavButtons, setShowNavButtons] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 70) {
      handleScrollRight();
    }
    if (touchStart - touchEnd < -70) {
      handleScrollLeft();
    }
  };

  const handleScrollLeft = () => {
    if (carouselRef.current) {
      const width = carouselRef.current.offsetWidth;
      carouselRef.current.scrollBy({
        left: -width / 2,
        behavior: "smooth",
      });
      setScrollPosition(Math.max(0, scrollPosition - 1));
    }
  };

  const handleScrollRight = () => {
    if (carouselRef.current) {
      const width = carouselRef.current.offsetWidth;
      carouselRef.current.scrollBy({
        left: width / 2,
        behavior: "smooth",
      });
      setScrollPosition(scrollPosition + 1);
    }
  };

  const handleCarouselMouseEnter = () => {
    setShowNavButtons(true);
  };

  const handleCarouselMouseLeave = () => {
    setShowNavButtons(false);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "transparent",
        zIndex: 2,
        pb: { xs: 2, md: 3 },
        pt: { xs: 2, md: 3 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
          px: { xs: 2, sm: 3, md: 4 },
          maxWidth: "xl",
          margin: "0 auto",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            color: "#fff",
            fontSize: { xs: "1rem", md: "1.1rem" },
          }}
        >
          Trending Movies
        </Typography>
        <Button
          endIcon={<KeyboardArrowRightIcon />}
          onClick={() => navigate("/trending")}
          sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem" }}
        >
          See All
        </Button>
      </Box>

      <Box
        sx={{
          position: "relative",
          "&:hover .MuiIconButton-root": {
            opacity: 1,
          },
          mb: 3,
          height: { xs: "190px", sm: "210px", md: "250px" },
          overflow: "visible",
          px: { xs: 2, sm: 3, md: 4 },
          maxWidth: "xl",
          margin: "0 auto",
        }}
        onMouseEnter={handleCarouselMouseEnter}
        onMouseLeave={handleCarouselMouseLeave}
      >
        <CarouselButton
          onClick={handleScrollLeft}
          sx={{
            left: 2,
            opacity: showNavButtons || isMobile ? 1 : 0,
            transition: "opacity 0.3s ease",
            display: { xs: "none", sm: "flex" },
          }}
          size="small"
        >
          <KeyboardArrowLeftIcon />
        </CarouselButton>

        <Box
          ref={carouselRef}
          sx={{
            display: "flex",
            alignItems: "center",
            overflowX: "auto",
            gap: { xs: 1, sm: 2 },
            pb: 1,
            height: "100%",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollSnapType: isMobile ? "x mandatory" : "none",
            position: "relative",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {movies.map((movie) => (
            <HeroMovieCard
              key={movie.id}
              movie={movie}
              isSelected={movie.id === selectedMovieId}
              onSelect={onMovieSelect}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          ))}
        </Box>

        <CarouselButton
          onClick={handleScrollRight}
          sx={{
            right: 2,
            opacity: showNavButtons || isMobile ? 1 : 0,
            transition: "opacity 0.3s ease",
            display: { xs: "none", sm: "flex" },
          }}
          size="small"
        >
          <KeyboardArrowRightIcon />
        </CarouselButton>

        {isMobile && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 1,
              gap: 1,
            }}
          >
            {[...Array(Math.ceil(movies.length / 2))].map((_, idx) => (
              <Box
                key={idx}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor:
                    scrollPosition === idx
                      ? "primary.main"
                      : "rgba(255,255,255,0.3)",
                }}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TrendingMoviesCarousel;
