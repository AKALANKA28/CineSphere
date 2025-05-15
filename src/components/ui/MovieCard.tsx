import React from "react";
import {
  Card,
  CardMedia,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Movie } from "../../types/movie.types";
import { getImageUrl, formatRating } from "../../utils/formatters";

interface MovieCardProps {
  movie: Movie;
  loading?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, loading = false }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClick = () => {
    if (!loading) {
      navigate(`/movie/${movie.id}`);
    }
  };

  // Simplified date formatter for DD.MM.YYYY format
  const formatSimpleDate = (dateString: string): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}.${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}.${date.getFullYear()}`;
  };

  return (
    <Card
      sx={{
        height: "100%",
        transition: "transform 0.2s, box-shadow 0.3s",
        "&:hover": {
          transform: loading ? "none" : "scale(1.03)",
          cursor: loading ? "default" : "pointer",
          boxShadow: `0 14px 28px rgba(0, 0, 0, 0.4)`,
        },
        borderRadius: "8px",
        overflow: "hidden",
        position: "relative",
        width: "100%",
        aspectRatio: "2/3",
      }}
      onClick={handleClick}
      elevation={3}
    >
      {loading ? (
        <Skeleton
          variant="rectangular"
          height="100%"
          animation="wave"
          sx={{ backgroundColor: theme.palette.action.hover }}
        />
      ) : (
        <>
          {/* Movie Poster - Cover full card */}
          <CardMedia
            component="img"
            image={getImageUrl(movie.poster_path)}
            alt={movie.title}
            sx={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />{" "}
          {/* Details overlay at the bottom with blur effect */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background:
                theme.palette.mode === "light"
                  ? "rgba(0,0,0,0.5)"
                  : "rgba(0,0,0,0.7)",
              backdropFilter: "blur(15px)",
              padding: 1.5,
              color: "#fff",
            }}
          >
            <Typography
              variant="body1"
              component="div"
              sx={{
                fontWeight: "bold",
                fontSize: isMobile ? "0.9rem" : "1rem",
                color: "#fff",
                mb: 0.5,
                lineHeight: 1.2,
              }}
              noWrap
            >
              {movie.title}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "#ddd", fontSize: isMobile ? "0.7rem" : "0.8rem" }}
              >
                {formatSimpleDate(movie.release_date)}
              </Typography>{" "}
              {/* IMDb rating in yellow badge */}
              <Box
                sx={{
                  backgroundColor: "#f5c518",
                  color: "#000",
                  px: 1,
                  py: 0.25,
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                  IMDb {formatRating(movie.vote_average)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Card>
  );
};

export default MovieCard;
