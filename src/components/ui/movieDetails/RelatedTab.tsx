import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import type { Movie } from "../../../types/movie.types";

interface RelatedTabProps {
  relatedMovies: Movie[];
  relatedPage: number;
  itemsPerPage: { xs: number; sm: number; md: number };
  handleRelatedPrev: () => void;
  handleRelatedNext: () => void;
  collectionName?: string;
  navigateToMovie: (id: number) => void;
}

const RelatedTab: React.FC<RelatedTabProps> = ({
  relatedMovies,
  relatedPage,
  itemsPerPage,
  handleRelatedPrev,
  handleRelatedNext,
  collectionName,
  navigateToMovie,
}) => {
  return (
    <Box sx={{ minHeight: "400px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 500, color: "text.primary" }}
        >
          {collectionName || "Sequels & Prequels"}
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Button
            onClick={handleRelatedPrev}
            disabled={relatedPage === 0}
            sx={(theme) => ({
              minWidth: 40,
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor:
                theme.palette.mode === "light"
                  ? "rgba(0,0,0,0.1)"
                  : "rgba(255,255,255,0.1)",
              color: theme.palette.mode === "light" ? "#333" : "#fff",
              mr: 1,
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "light"
                    ? "rgba(0,0,0,0.2)"
                    : "rgba(255,255,255,0.2)",
              },
              "&.Mui-disabled": {
                color:
                  theme.palette.mode === "light"
                    ? "rgba(0,0,0,0.3)"
                    : "rgba(255,255,255,0.3)",
              },
            })}
          >
            <NavigateBeforeIcon />
          </Button>
          <Button
            onClick={handleRelatedNext}
            disabled={
              relatedPage >=
              Math.ceil(relatedMovies.length / itemsPerPage.md) - 1
            }
            sx={(theme) => ({
              minWidth: 40,
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor:
                theme.palette.mode === "light"
                  ? "rgba(0,0,0,0.1)"
                  : "rgba(255,255,255,0.1)",
              color: theme.palette.mode === "light" ? "#333" : "#fff",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "light"
                    ? "rgba(0,0,0,0.2)"
                    : "rgba(255,255,255,0.2)",
              },
              "&.Mui-disabled": {
                color:
                  theme.palette.mode === "light"
                    ? "rgba(0,0,0,0.3)"
                    : "rgba(255,255,255,0.3)",
              },
            })}
          >
            <NavigateNextIcon />
          </Button>
        </Box>
      </Box>

      {relatedMovies.length > 0 ? (
        <Grid container spacing={3}>
          {relatedMovies
            .slice(
              relatedPage * itemsPerPage.md,
              (relatedPage + 1) * itemsPerPage.md
            )
            .map((movie) => (
              <Grid
                item
                key={movie.id}
                xs={12 / itemsPerPage.xs}
                sm={12 / itemsPerPage.sm}
                md={12 / itemsPerPage.md}
                onClick={() => navigateToMovie(movie.id)}
                sx={{ cursor: "pointer" }}
              >
                <Box
                  sx={{
                    height: 300,
                    borderRadius: 2,
                    overflow: "hidden",
                    mb: 1,
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500${
                      movie.backdrop_path || movie.poster_path
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.03)",
                    },
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "50%",
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: 2,
                      zIndex: 2,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        color: "white",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        textShadow: (theme) =>
                          theme.palette.mode === "dark"
                            ? "0 2px 5px rgba(0,0,0,0.5)"
                            : "none",
                      }}
                    >
                      {movie.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      {movie.release_date
                        ? new Date(movie.release_date).getFullYear()
                        : ""}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
        </Grid>
      ) : (
        <Typography
          variant="body1"
          sx={(theme) => ({
            color:
              theme.palette.mode === "light"
                ? "rgba(0,0,0,0.7)"
                : "rgba(255,255,255,0.7)",
          })}
        >
          No related movies found.
        </Typography>
      )}
    </Box>
  );
};

export default RelatedTab;
