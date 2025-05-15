import React from "react";
import { Box, Grid, Skeleton } from "@mui/material";

const MovieSectionLoading: React.FC = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Skeleton variant="text" width={200} height={40} />
        <Skeleton variant="text" width={80} height={30} />
      </Box>

      <Grid container spacing={2}>
        {[...Array(6)].map((_, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={2}>
            <Skeleton
              variant="rectangular"
              height={300}
              sx={{ borderRadius: 1 }}
            />
            <Skeleton variant="text" width="80%" sx={{ mt: 1 }} />
            <Skeleton variant="text" width="50%" />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MovieSectionLoading;
