import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import useMovieDetails from "../hooks/useMovieDetails";
import type { Movie, CastMember } from "../types/movie.types";
import {
  getMovieCredits,
  getSimilarMovies,
  getMovieRecommendations,
  getCollectionDetails,
  getMovieVideos,
} from "../api/movieApi";

// Import components
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import MovieHero from "../components/ui/movieDetails/MovieHero";
import MovieTabs from "../components/ui/movieDetails/MovieTabs";
import RecommendationSection from "../components/ui/movieDetails/RecommendationSection";
import TrailerPlayer from "../components/ui/home/hero/TrailerPlayer";

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movieId = id ? parseInt(id) : null;
  const [activeTab, setActiveTab] = useState<string>("storyline");
  const { movie, isLoading, error } = useMovieDetails(movieId);

  // State for API data
  const [cast, setCast] = useState<CastMember[]>([]);
  const [relatedMovies, setRelatedMovies] = useState<Movie[]>([]);
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  // State for carousels
  const [castPage, setCastPage] = useState<number>(0);
  const [relatedPage, setRelatedPage] = useState<number>(0);
  const [recommendedPage, setRecommendedPage] = useState<number>(0);

  // Items per page for different screen sizes
  const castItemsPerPage = { xs: 2, sm: 4, md: 6 };
  const moviesItemsPerPage = { xs: 1, sm: 2, md: 4 };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [movieId]);

  // Fetch cast, similar movies, recommendations, and collection data
  useEffect(() => {
    if (movieId) {
      // Fetch the trailer
      getMovieVideos(movieId)
        .then((data) => {
          const trailer = data.results.find(
            (video) =>
              video.site === "YouTube" &&
              (video.type === "Trailer" || video.type === "Teaser") &&
              video.official
          );

          if (trailer) {
            setTrailerKey(trailer.key);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch trailer:", err);
        });

      // Fetch cast members
      getMovieCredits(movieId)
        .then((data) => {
          // Map API cast members to our interface format
          const castData = data.cast.slice(0, 10).map((actor) => ({
            id: actor.id,
            name: actor.name,
            character: actor.character,
            profile_path: actor.profile_path,
          }));
          setCast(castData.length > 0 ? castData : []);
        })
        .catch((error) => {
          console.error("Failed to fetch cast:", error);
          setCast([]);
        });

      // Fetch similar movies
      getSimilarMovies(movieId)
        .then((data) => {
          if (data.results && data.results.length > 0) {
            setRelatedMovies(data.results.slice(0, 8));
          } else {
            setRelatedMovies([]);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch similar movies:", error);
          setRelatedMovies([]);
        });

      // Fetch movie recommendations
      getMovieRecommendations(movieId)
        .then((data) => {
          if (data.results) {
            setRecommendedMovies(data.results.slice(0, 8));
          }
        })
        .catch((error) => {
          console.error("Failed to fetch recommendations:", error);
        });
    }
  }, [movieId]);

  // Fetch collection data if the movie belongs to a collection
  useEffect(() => {
    if (movie && movie.belongs_to_collection) {
      getCollectionDetails(movie.belongs_to_collection.id)
        .then((data) => {
          // Use collection parts as related movies if available
          if (data.parts && data.parts.length > 0) {
            setRelatedMovies(data.parts);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch collection:", error);
        });
    }
  }, [movie]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  // Function to handle playing trailer
  const handlePlayTrailer = () => {
    if (trailerKey) {
      setShowTrailer(true);
    }
  };

  // Function to close trailer
  const handleCloseTrailer = () => {
    setShowTrailer(false);
  };

  // Carousel navigation handlers
  const handleCastPrev = () => {
    setCastPage((prev) => Math.max(0, prev - 1));
  };

  const handleCastNext = () => {
    const maxPage = Math.ceil(cast.length / castItemsPerPage.md) - 1;
    setCastPage((prev) => Math.min(maxPage, prev + 1));
  };

  const handleRelatedPrev = () => {
    setRelatedPage((prev) => Math.max(0, prev - 1));
  };

  const handleRelatedNext = () => {
    const maxPage = Math.ceil(relatedMovies.length / moviesItemsPerPage.md) - 1;
    setRelatedPage((prev) => Math.min(maxPage, prev + 1));
  };

  const handleRecommendedPrev = () => {
    setRecommendedPage((prev) => Math.max(0, prev - 1));
  };

  const handleRecommendedNext = () => {
    const maxPage =
      Math.ceil(recommendedMovies.length / moviesItemsPerPage.md) - 1;
    setRecommendedPage((prev) => Math.min(maxPage, prev + 1));
  };

  const navigateToMovie = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !movie) {
    return (
      <ErrorMessage
        message={error || "Movie not found."}
        onGoBack={() => navigate(-1)}
      />
    );
  }
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        minHeight: "100vh",
      }}
    >
      {showTrailer && trailerKey && (
        <TrailerPlayer trailerKey={trailerKey} onClose={handleCloseTrailer} />
      )}
      {!showTrailer && (
        <Box sx={{ position: "relative" }}>
          <MovieHero movie={movie} onPlayTrailer={handlePlayTrailer}>
            <MovieTabs
              movie={movie}
              activeTab={activeTab}
              handleTabChange={handleTabChange}
              cast={cast}
              relatedMovies={relatedMovies}
              castPage={castPage}
              relatedPage={relatedPage}
              castItemsPerPage={castItemsPerPage}
              moviesItemsPerPage={moviesItemsPerPage}
              handleCastPrev={handleCastPrev}
              handleCastNext={handleCastNext}
              handleRelatedPrev={handleRelatedPrev}
              handleRelatedNext={handleRelatedNext}
              navigateToMovie={navigateToMovie}
            />
          </MovieHero>
          <Box sx={{ position: "relative", mt: -2, zIndex: 2 }}>
            <RecommendationSection
              recommendedMovies={recommendedMovies}
              navigateToMovie={navigateToMovie}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MovieDetailsPage;
