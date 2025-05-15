import React from "react";
import { Box, Typography, Grid, Button, Avatar } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import type { CastMember } from "../../../types/movie.types";

interface CastTabProps {
  cast: CastMember[];
  castPage: number;
  itemsPerPage: { xs: number; sm: number; md: number };
  handleCastPrev: () => void;
  handleCastNext: () => void;
}

const CastTab: React.FC<CastTabProps> = ({
  cast,
  castPage,
  itemsPerPage,
  handleCastPrev,
  handleCastNext,
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
          Cast
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Button
            onClick={handleCastPrev}
            disabled={castPage === 0}
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
            onClick={handleCastNext}
            disabled={castPage >= Math.ceil(cast.length / itemsPerPage.md) - 1}
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

      {cast.length > 0 ? (
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          <Grid container spacing={3}>
            {cast
              .slice(
                castPage * itemsPerPage.md,
                (castPage + 1) * itemsPerPage.md
              )
              .map((actor) => (
                <Grid item key={actor.id} xs={4} sm={3} md={2} lg={2}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Avatar
                      src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                      alt={actor.name}
                      sx={{
                        width: { xs: 80, sm: 100, md: 120 },
                        height: { xs: 80, sm: 100, md: 120 },
                        mb: 1,
                        borderRadius: "50%",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 500, mb: 0.5 }}
                    >
                      {actor.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      {actor.character}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            <Grid item xs={12}>
              <Button
                variant="text"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  textTransform: "none",
                  mt: 1,
                }}
              >
                View all cast members
              </Button>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)" }}>
          No cast information available.
        </Typography>
      )}
    </Box>
  );
};

// Fix for default export issue
const CastTabExport = CastTab;
export default CastTabExport;
