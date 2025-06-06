import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { formatDate, formatRuntime } from "../../../utils/formatters";
import type { MovieDetails } from "../../../types/movie.types";

interface StorylineTabProps {
  movie: MovieDetails;
}

const StorylineTab: React.FC<StorylineTabProps> = ({ movie }) => {
  return (
    <Box sx={{ minHeight: "400px" }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 500 }}>
        Storyline
      </Typography>{" "}
      <Typography
        variant="body1"
        sx={(theme) => ({
          mb: 4,
          maxWidth: "800px",
          lineHeight: 1.7,
          color:
            theme.palette.mode === "light"
              ? "rgba(0,0,0,1)"
              : "rgba(255,255,255,0.85)",
        })}
      >
        {movie.overview}
      </Typography>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
        Details
      </Typography>{" "}
      <Grid
        container
        spacing={2}
        sx={(theme) => ({
          color:
            theme.palette.mode === "light"
              ? "rgba(0,0,0,1)"
              : "rgba(255,255,255,0.85)",
        })}
      >
        {" "}
        <Grid item xs={12} sm={6} md={4}>
          <Typography
            variant="body2"
            sx={(theme) => ({
              color:
                theme.palette.mode === "light"
                  ? "rgba(0,0,0,0.8)"
                  : "rgba(255,255,255,0.6)",
              fontWeight: theme.palette.mode === "light" ? 500 : 400,
            })}
          >
            Release Date
          </Typography>
          <Typography variant="body1">
            {formatDate(movie.release_date)}
          </Typography>
        </Grid>{" "}
        <Grid item xs={12} sm={6} md={4}>
          <Typography
            variant="body2"
            sx={(theme) => ({
              color:
                theme.palette.mode === "light"
                  ? "rgba(0,0,0,0.8)"
                  : "rgba(255,255,255,0.6)",
              fontWeight: theme.palette.mode === "light" ? 500 : 400,
            })}
          >
            Runtime
          </Typography>
          <Typography variant="body1">
            {formatRuntime(movie.runtime)}
          </Typography>
        </Grid>
        {movie.genres && (
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={(theme) => ({
                color:
                  theme.palette.mode === "light"
                    ? "rgba(0,0,0,0.8)"
                    : "rgba(255,255,255,0.6)",
                fontWeight: theme.palette.mode === "light" ? 500 : 400,
              })}
            >
              Genres
            </Typography>
            <Typography variant="body1">
              {movie.genres.map((g) => g.name).join(", ")}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default StorylineTab;
