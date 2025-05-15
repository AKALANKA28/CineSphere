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
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          {collectionName || "Sequels & Prequels"}
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Button
            onClick={handleRelatedPrev}
            disabled={relatedPage === 0}
            sx={{
              minWidth: 40,
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "white",
              mr: 1,
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.2)",
              },
              "&.Mui-disabled": {
                color: "rgba(255,255,255,0.3)",
              },
            }}
          >
            <NavigateBeforeIcon />
          </Button>
          <Button
            onClick={handleRelatedNext}
            disabled={
              relatedPage >=
              Math.ceil(relatedMovies.length / itemsPerPage.md) - 1
            }
            sx={{
              minWidth: 40,
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.2)",
              },
              "&.Mui-disabled": {
                color: "rgba(255,255,255,0.3)",
              },
            }}
          >
            <NavigateNextIcon />
          </Button>
        </Box>
      </Box>

      {relatedMovies.length > 0 ? (
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          <Grid container spacing={2}>
            {relatedMovies
              .slice(
                relatedPage * itemsPerPage.md,
                (relatedPage + 1) * itemsPerPage.md
              )
              .map((relatedMovie) => (
                <Grid item key={relatedMovie.id} xs={6} sm={4} md={3} lg={3}>
                  <Box
                    sx={{
                      borderRadius: 2,
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "scale(1.03)",
                      },
                    }}
                    onClick={() => navigateToMovie(relatedMovie.id)}
                  >
                    <Box
                      sx={{
                        height: { xs: 200, sm: 250, md: 300 },
                        width: "100%",
                        backgroundColor: "rgba(0,0,0,0.2)",
                        backgroundImage: `url(https://image.tmdb.org/t/p/w500${relatedMovie.poster_path})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: 2,
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        mt: 1,
                        fontWeight: 500,
                        textAlign: "center",
                      }}
                    >
                      {relatedMovie.title}
                    </Typography>
                  </Box>
                </Grid>
              ))}
          </Grid>
        </Box>
      ) : (
        <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)" }}>
          No related movies available.
        </Typography>
      )}
    </Box>
  );
};

export default RelatedTab;
