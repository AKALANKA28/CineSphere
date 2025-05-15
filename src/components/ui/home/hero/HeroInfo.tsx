import React from "react";
import {
  Box,
  Typography,
  Grid,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SaveIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import type { MovieDetails } from "../../../../types/movie.types";
import { useWatchlist } from "../../../../context/WatchlistContext";
import { useAuth } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface HeroInfoProps {
  movie: MovieDetails;
  onPlayClick: () => void;
  hasTrailer: boolean;
}

const HeroInfo: React.FC<HeroInfoProps> = ({
  movie,
  onPlayClick,
  hasTrailer,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { isAuthenticated, openAuthDialog } = useAuth();
  const { addToWatchlist, isInWatchlist, removeFromWatchlist } = useWatchlist();
  const navigate = useNavigate();

  const isMovieSaved = isInWatchlist(movie.id);

  const handleSaveClick = () => {
    if (!isAuthenticated) {
      openAuthDialog("login");
      return;
    }

    if (isMovieSaved) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  const handleDetailsClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <Grid
      container
      spacing={2}
      justifyContent="flex-start"
      sx={{
        maxWidth: "800px",
        pb: { xs: 10, sm: 15, md: 20 },
      }}
    >
      <Grid item xs={12}>
        <Typography
          variant={isMobile ? "h3" : "h1"}
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 1,
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            fontSize: {
              xs: "2.5rem",
              sm: "3rem",
              md: "3.5rem",
              lg: "4rem",
            },
            textTransform: "uppercase",
            fontFamily: "'Cinzel', serif",
            letterSpacing: "1px",
          }}
        >
          {movie.title}
        </Typography>

        <Box
          sx={{
            mb: 2,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              mr: 2,
              color: "#ccc",
              fontSize: { xs: "0.8rem", md: "0.9rem" },
            }}
          >
            {new Date(movie.release_date).getFullYear()}
          </Typography>

          <Chip
            label="HDR"
            size="small"
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              color: "#fff",
              height: 20,
              mr: 2,
              fontSize: "0.7rem",
              borderRadius: "3px",
            }}
          />

          {movie.genres.slice(0, 2).map((genre) => (
            <Chip
              key={genre.id}
              label={genre.name}
              size="small"
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "#fff",
                height: 20,
                mr: 2,
                fontSize: "0.7rem",
                borderRadius: "3px",
              }}
            />
          ))}
        </Box>

        <Typography
          variant="body2"
          sx={{
            mb: 3,
            maxWidth: "600px",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: "#ccc",
          }}
        >
          {movie.overview}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
          {" "}
          <IconButton
            sx={{
              bgcolor: theme.palette.secondary.main,
              color: "#fff",
              mr: 2,
              "&:hover": {
                bgcolor: theme.palette.secondary.dark,
              },
            }}
            onClick={onPlayClick}
            disabled={!hasTrailer}
          >
            <PlayArrowIcon />
          </IconButton>{" "}
          <Tooltip title="Movie details">
            <IconButton
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "#fff",
                mr: 2,
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.3)",
                },
              }}
              onClick={handleDetailsClick}
            >
              <FormatListBulletedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={isMovieSaved ? "Remove from watchlist" : "Add to watchlist"}
          >
            <IconButton
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "#fff",
                mr: 2,
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.3)",
                },
              }}
              onClick={handleSaveClick}
            >
              {isMovieSaved ? <BookmarkIcon color="secondary" /> : <SaveIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Grid>
    </Grid>
  );
};

export default HeroInfo;
