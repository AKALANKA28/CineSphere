import React from "react";
import { Container, Box } from "@mui/material";
import MovieSection from "../common/MovieSection";

const HomeContent: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4, bgcolor: "background.default" }}>
      <Box sx={{ mb: 6 }}>
        <MovieSection
          title="Popular Movies"
          endpoint="popular"
          showMoreLink="/movies/popular"
        />
      </Box>

      <Box sx={{ mb: 6 }}>
        <MovieSection
          title="Top Rated Movies"
          endpoint="top_rated"
          showMoreLink="/movies/top_rated"
        />
      </Box>

      <Box sx={{ mb: 6 }}>
        <MovieSection
          title="Upcoming Movies"
          endpoint="upcoming"
          showMoreLink="/movies/upcoming"
        />
      </Box>
    </Container>
  );
};

export default HomeContent;
