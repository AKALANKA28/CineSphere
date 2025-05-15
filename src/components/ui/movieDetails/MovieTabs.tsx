import React from "react";
import { Box, Tabs, Tab } from "@mui/material";
import type {
  Movie,
  MovieDetails,
  CastMember,
} from "../../../types/movie.types";
import StorylineTab from "./StorylineTab";
import CastTab from "./CastTab";
import RelatedTab from "./RelatedTab";

interface MovieTabsProps {
  movie: MovieDetails;
  activeTab: string;
  handleTabChange: (event: React.SyntheticEvent, newValue: string) => void;
  cast: CastMember[];
  relatedMovies: Movie[];
  castPage: number;
  relatedPage: number;
  castItemsPerPage: { xs: number; sm: number; md: number };
  moviesItemsPerPage: { xs: number; sm: number; md: number };
  handleCastPrev: () => void;
  handleCastNext: () => void;
  handleRelatedPrev: () => void;
  handleRelatedNext: () => void;
  navigateToMovie: (id: number) => void;
}

const MovieTabs: React.FC<MovieTabsProps> = ({
  movie,
  activeTab,
  handleTabChange,
  cast,
  relatedMovies,
  castPage,
  relatedPage,
  castItemsPerPage,
  moviesItemsPerPage,
  handleCastPrev,
  handleCastNext,
  handleRelatedPrev,
  handleRelatedNext,
  navigateToMovie,
}) => {
  return (
    <Box sx={{ width: "100%", mb: 4 }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        textColor="inherit"
        sx={{
          mb: 3,
          borderBottom: 1,
          borderColor: "divider",
          "& .MuiTabs-indicator": {
            backgroundColor: "primary.main",
          },
          "& .MuiTab-root": {
            color: "rgba(255,255,255,0.7)",
            "&.Mui-selected": {
              color: "white",
            },
          },
        }}
      >
        <Tab label="Storyline & Details" value="storyline" />
        <Tab label="Cast" value="cast" />
        <Tab label="Sequels & Prequels" value="related" />
      </Tabs>

      {activeTab === "storyline" && <StorylineTab movie={movie} />}

      {activeTab === "cast" && (
        <CastTab
          cast={cast}
          castPage={castPage}
          itemsPerPage={castItemsPerPage}
          handleCastPrev={handleCastPrev}
          handleCastNext={handleCastNext}
        />
      )}

      {activeTab === "related" && (
        <RelatedTab
          relatedMovies={relatedMovies}
          relatedPage={relatedPage}
          itemsPerPage={moviesItemsPerPage}
          handleRelatedPrev={handleRelatedPrev}
          handleRelatedNext={handleRelatedNext}
          collectionName={
            movie.belongs_to_collection
              ? movie.belongs_to_collection.name
              : undefined
          }
          navigateToMovie={navigateToMovie}
        />
      )}
    </Box>
  );
};

export default MovieTabs;
