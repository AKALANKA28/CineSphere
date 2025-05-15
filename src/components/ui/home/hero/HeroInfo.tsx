import React from "react";
import {
  Box,
  Typography,
  Grid,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DownloadIcon from "@mui/icons-material/Download";
import type { MovieDetails } from "../../../../types/movie.types";

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
          </IconButton>
          <IconButton
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              color: "#fff",
              mr: 2,
            }}
          >
            <FormatListBulletedIcon />
          </IconButton>
          <IconButton
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              color: "#fff",
              mr: 2,
            }}
          >
            <AddIcon />
          </IconButton>
          <IconButton
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              color: "#fff",
            }}
          >
            <DownloadIcon />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
};

export default HeroInfo;
