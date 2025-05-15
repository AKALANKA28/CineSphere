import React from "react";
import type { ReactNode } from "react";
import {
  Box,
  Container,
  Typography,
  Chip,
  Button,
  Grid,
  Tooltip,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StarIcon from "@mui/icons-material/Star";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useWatchlist } from "../../../context/WatchlistContext";
import { getImageUrl, formatRuntime } from "../../../utils/formatters";
import type { MovieDetails } from "../../../types/movie.types";

interface MovieHeroProps {
  movie: MovieDetails;
  children?: ReactNode;
  onPlayTrailer?: () => void;
}

const MovieHero: React.FC<MovieHeroProps> = ({
  movie,
  children,
  onPlayTrailer,
}) => {
  const { isAuthenticated, openAuthDialog } = useAuth();
  const { addToWatchlist, isInWatchlist, removeFromWatchlist } = useWatchlist();

  const isBookmarked = isInWatchlist(movie.id);

  const handleBookmarkClick = () => {
    if (!isAuthenticated) {
      // Open login dialog if not authenticated
      openAuthDialog("login");
      return;
    }

    if (isBookmarked) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "auto",
        minHeight: { xs: "100vh", md: "100vh" },
        backgroundImage: `url(${getImageUrl(
          movie.backdrop_path,
          "backdrop",
          "large"
        )})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        paddingBottom: 8,
        color: (theme) => (theme.palette.mode === "light" ? "#000000" : "#fff"),
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: (theme) =>
            theme.palette.mode === "light"
              ? "linear-gradient(to bottom, rgba(255, 255, 255, 0.51) 0%, rgba(255, 255, 255, 0.85) 50%, #ffffff 100%)"
              : "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 50%,#121212 100%)",
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2, pt: 15 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7} lg={8}>
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                {" "}
                <Chip
                  label={`${new Date(
                    movie.release_date
                  ).getFullYear()} • ${formatRuntime(movie.runtime)} • R`}
                  sx={(theme) => ({
                    bgcolor:
                      theme.palette.mode === "light"
                        ? "rgba(0,0,0,0.1)"
                        : "rgba(255,255,255,0.15)",
                    color: theme.palette.mode === "light" ? "#000000" : "white",
                    fontWeight: 500,
                    borderRadius: "4px",
                    height: 24,
                  })}
                />
                 <Box
                  sx={(theme) => ({
                    display: "flex",
                    alignItems: "center",
                    bgcolor:
                      theme.palette.mode === "light"
                        ? "rgba(0,0,0,0.07)"
                        : "rgba(255,255,255,0.1)",
                    borderRadius: "4px",
                    px: 1,
                    ml: 2,
                  })}
                >
                  <StarIcon sx={{ color: "#f5c518", fontSize: "1.2rem" }} />{" "}
                  <Typography
                    variant="body2"
                    sx={(theme) => ({
                      ml: 0.5,
                      fontWeight: "bold",
                      color:
                        theme.palette.mode === "light" ? "#000000" : "inherit",
                    })}
                  >
                    {movie.vote_average.toFixed(1)}
                  </Typography>
                </Box>
              </Box>{" "}
              <Typography
                variant="h2"
                component="h1"
                sx={(theme) => ({
                  fontWeight: 700,
                  fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
                  mb: 2,
                  color: theme.palette.mode === "light" ? "#000000" : "#fff",
                  textShadow:
                    theme.palette.mode === "dark"
                      ? "0 2px 10px rgba(0,0,0,0.5)"
                      : "none",
                })}
              >
                {movie.title}
              </Typography>{" "}
              {movie.tagline && (
                <Typography
                  variant="h6"
                  sx={(theme) => ({
                    opacity: 0.8,
                    mb: 3,
                    fontStyle: "italic",
                    maxWidth: "800px",
                    color: theme.palette.mode === "light" ? "#222" : "inherit",
                    fontWeight: theme.palette.mode === "light" ? 500 : 400,
                  })}
                >
                  {movie.tagline}
                </Typography>
              )}{" "}
              <Box sx={{ display: "flex", mb: 4, gap: 2 }}>
                {" "}
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<PlayArrowIcon />}
                  onClick={onPlayTrailer}
                  sx={{
                    bgcolor: (theme) => theme.palette.secondary.main,
                    borderRadius: "4px",
                    px: 4,
                    "&:hover": {
                      bgcolor: (theme) => theme.palette.secondary.dark,
                    },
                  }}
                >
                  Trailer
                </Button>{" "}
                <Tooltip
                  title={
                    !isAuthenticated
                      ? "Log in to save movies"
                      : isBookmarked
                      ? "Remove from watchlist"
                      : "Add to watchlist"
                  }
                >
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={
                      isBookmarked ? (
                        <BookmarkIcon color="inherit" />
                      ) : (
                        <BookmarkBorderIcon />
                      )
                    }
                    onClick={handleBookmarkClick}
                    sx={(theme) => ({
                      borderColor:
                        theme.palette.mode === "light"
                          ? "rgba(0,0,0,0.6)"
                          : "rgba(255,255,255,0.5)",
                      color:
                        theme.palette.mode === "light" ? "#000000" : "white",
                      borderRadius: "4px",
                      "&:hover": {
                        borderColor:
                          theme.palette.mode === "light" ? "#000" : "white",
                        bgcolor:
                          theme.palette.mode === "light"
                            ? "rgba(0,0,0,0.05)"
                            : "rgba(255,255,255,0.1)",
                      },
                    })}
                  >
                    {isBookmarked ? "Saved" : "Save"}
                  </Button>
                </Tooltip>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
              >
                {" "}
               
              </Box>
            </Box>

            {children}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MovieHero;
