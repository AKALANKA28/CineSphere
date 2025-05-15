import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Container,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useMovieContext } from "../../../../context/MovieContext";
import { getMovieDetails, getMovieVideos } from "../../../../api/movieApi";
import type { Movie, MovieDetails } from "../../../../types/movie.types";

// Import our new components
import HeroInfo from "./HeroInfo";
import TrailerPlayer from "./TrailerPlayer";
import TrendingMoviesCarousel from "./TrendingMoviesCarousel";

const HeroBox = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "100vh",
  width: "100%",
  maxWidth: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  color: theme.palette.mode === "light" ? "#333" : "#fff",
  display: "flex",
  alignItems: "center",
  transition: "background-image 1s ease-in-out",
  marginTop: 0, // Remove negative margin
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      theme.palette.mode === "light"
        ? "linear-gradient(0deg, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0.6) 20%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0) 100%)"
        : "linear-gradient(0deg, #121212 0%, #000000 10%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 100%)",
    zIndex: 1,
  },
}));

const HeroSection: React.FC = () => {
  const theme = useTheme();
  // isMobile is used by the TrendingMoviesCarousel component
  const { trendingMovies } = useMovieContext();

  const carouselRef = useRef<HTMLDivElement>(null);

  const [featuredMovie, setFeaturedMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  const displayedMovies = trendingMovies.slice(0, 8);

  useEffect(() => {
    const fetchFeaturedMovieData = async () => {
      try {
        setIsLoading(true);

        const movieToFeature =
          trendingMovies.length > 0 ? trendingMovies[0].id : 507089;

        const movieDetails = await getMovieDetails(movieToFeature);
        setFeaturedMovie(movieDetails);
        setSelectedCardId(movieToFeature);

        const videoResponse = await getMovieVideos(movieToFeature);

        const trailer = videoResponse.results.find(
          (video) =>
            video.site === "YouTube" &&
            (video.type === "Trailer" || video.type === "Teaser") &&
            video.official
        );

        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.error("Failed to fetch movie data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (trendingMovies.length > 0) {
      fetchFeaturedMovieData();
    }
  }, [trendingMovies]);

  const handleMovieSelect = async (movie: Movie) => {
    if (animating || featuredMovie?.id === movie.id) return;

    try {
      setAnimating(true);
      setSelectedCardId(movie.id);

      if (carouselRef.current) {
        const cardElements =
          carouselRef.current.querySelectorAll("[data-movie-id]");
        const selectedCardElement = Array.from(cardElements).find(
          (el) => el.getAttribute("data-movie-id") === movie.id.toString()
        ) as HTMLElement;

        if (selectedCardElement) {
          const containerWidth = carouselRef.current.offsetWidth;
          const cardWidth = selectedCardElement.offsetWidth;
          const cardLeft = selectedCardElement.offsetLeft;

          const scrollPosition = cardLeft - containerWidth / 2 + cardWidth / 2;

          carouselRef.current.scrollTo({
            left: scrollPosition,
            behavior: "smooth",
          });
        }
      }

      const [movieDetails, videoResponse] = await Promise.all([
        getMovieDetails(movie.id),
        getMovieVideos(movie.id),
      ]);

      const trailer = videoResponse.results.find(
        (video) =>
          video.site === "YouTube" &&
          (video.type === "Trailer" || video.type === "Teaser") &&
          video.official
      );

      setFeaturedMovie(movieDetails);
      setTrailerKey(trailer ? trailer.key : null);
      setShowTrailer(false);

      setTimeout(() => {
        setAnimating(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to fetch movie data:", error);
      setAnimating(false);
    }
  };
  const handlePlayClick = () => {
    if (trailerKey) {
      setShowTrailer(true);
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!featuredMovie) return null;
  const handleCloseTrailer = () => {
    setShowTrailer(false);
  };
  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      <HeroBox
        sx={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})`,
          backgroundAttachment: "fixed", // Make background image fixed while scrolling
          display: showTrailer ? "none" : "flex", // Hide hero when trailer is showing
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
            zIndex: 1,
            px: { xs: 2, sm: 3, md: 4 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <HeroInfo
            movie={featuredMovie}
            onPlayClick={handlePlayClick}
            hasTrailer={!!trailerKey}
          />
        </Container>

        <TrendingMoviesCarousel
          movies={displayedMovies}
          selectedMovieId={selectedCardId}
          onMovieSelect={handleMovieSelect}
          carouselRef={carouselRef}
        />
      </HeroBox>

      {/* Always render the trailer player when showTrailer is true */}
      {showTrailer && trailerKey && (
        <TrailerPlayer trailerKey={trailerKey} onClose={handleCloseTrailer} />
      )}
    </Box>
  );
};

export default HeroSection;
