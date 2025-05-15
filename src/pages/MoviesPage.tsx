import React, { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { useMovieContext } from "../context/MovieContext";
import { useSearchHistory } from "../context/SearchHistoryContext";
import MoviesFilter from "../components/ui/movies/MoviesFilter";
import MoviesResults from "../components/ui/movies/MoviesResults";

const MoviesPage: React.FC = () => {
  const {
    genres,
    isLoading,
    error,
    discoverMovies,
    discoverResults,
    isDiscoverLoading,
    hasMoreDiscoverResults,
    loadMoreDiscoverResults,
  } = useMovieContext();
  // We'll use this later when implementing search history features
  const {
    /* addToSearchHistory */
  } = useSearchHistory();
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Initial data load
  useEffect(() => {
    // Load initial discover results with default sorting
    discoverMovies({ sort_by: sortBy });
  }, []);

  // Handle loading more movies
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    loadMoreDiscoverResults().finally(() => {
      setIsLoadingMore(false);
    });
  };

  const handleSortByChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };

  const handleGenreChange = (event: SelectChangeEvent) => {
    setSelectedGenre(event.target.value);
  };

  const handleRatingChange = (event: SelectChangeEvent) => {
    setSelectedRating(event.target.value);
  };

  const handleYearChange = (event: SelectChangeEvent) => {
    setSelectedYear(event.target.value);
  };

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();

    // Build discover options based on filters
    const discoverOptions: any = {
      sort_by: sortBy,
      include_adult: false,
    };

    // Add genre filter if selected
    if (selectedGenre !== "All") {
      discoverOptions.with_genres = selectedGenre;
    }

    // Add release year filter if selected
    if (selectedYear !== "All") {
      const year = parseInt(selectedYear);
      discoverOptions["primary_release_date.gte"] = `${year}-01-01`;
      discoverOptions["primary_release_date.lte"] = `${year}-12-31`;
    }

    // Add rating filter if selected
    if (selectedRating !== "All") {
      const [minRating, maxRating] = selectedRating.split("-").map(Number);
      discoverOptions["vote_average.gte"] = minRating;
      if (maxRating) {
        discoverOptions["vote_average.lte"] = maxRating;
      }
    }

    // Add language filter if selected
    if (selectedLanguage !== "All") {
      discoverOptions.with_original_language = selectedLanguage;
    }

    // Call the discover API with our options
    discoverMovies(discoverOptions);
  };

  return (
    <Box sx={{ pt: 8, pb: 6 }}>
      <Container maxWidth="xl">
        <MoviesFilter
          genres={genres}
          sortBy={sortBy}
          selectedGenre={selectedGenre}
          selectedRating={selectedRating}
          selectedYear={selectedYear}
          selectedLanguage={selectedLanguage}
          onSortByChange={handleSortByChange}
          onGenreChange={handleGenreChange}
          onRatingChange={handleRatingChange}
          onYearChange={handleYearChange}
          onLanguageChange={handleLanguageChange}
          onSearch={handleSearch}
        />

        <MoviesResults
          movies={discoverResults}
          isLoading={isLoading || isDiscoverLoading}
          isLoadingMore={isLoadingMore}
          error={error}
          hasMoreResults={hasMoreDiscoverResults}
          onLoadMore={handleLoadMore}
        />
      </Container>
    </Box>
  );
};

export default MoviesPage;
