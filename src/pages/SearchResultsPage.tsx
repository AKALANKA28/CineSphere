import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
  Card,
  Button,
  IconButton,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import HistoryIcon from "@mui/icons-material/History";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import LoadMoreButton from "../components/ui/common/LoadMoreButton";
import MovieCard from "../components/ui/MovieCard";
import MoviesCarousel from "../components/ui/common/MoviesCarousel";
import { useMovieContext } from "../context/MovieContext";
import { logDebug, logError } from "../utils/debug";
import { useSearchHistory } from "../context/SearchHistoryContext";
import type { SearchHistoryItem } from "../context/SearchHistoryContext";
import { formatDistanceToNow } from "../utils/formatters";

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("query") || "";
  const [lastSearchQuery, setLastSearchQuery] = useState<string>("");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const {
    searchMovies,
    searchResults,
    isLoading,
    error,
    resetSearch,
    loadMoreSearchResults,
    hasMoreSearchResults,
  } = useMovieContext();
  const { searchHistory, addToHistory } = useSearchHistory();

  useEffect(() => {
    logDebug("SearchResultsPage mounted");

    return () => {
      logDebug("SearchResultsPage unmounted");
      resetSearch();
    };
  }, [resetSearch]);
  useEffect(() => {
    if (query !== lastSearchQuery) {
      logDebug(`SearchResultsPage: Query changed to "${query}"`);
      setLastSearchQuery(query);

      if (!query) {
        logDebug("SearchResultsPage: Empty query, no search needed");
        return;
      }

      logDebug(`SearchResultsPage: Initiating search for "${query}"`);
      const searchStartTime = performance.now();

      searchMovies(query)
        .then(() => {
          const searchEndTime = performance.now();
          logDebug(
            `SearchResultsPage: Search completed in ${Math.round(
              searchEndTime - searchStartTime
            )}ms`
          );

          // Add to history with poster from first result if available
          const posterPath =
            searchResults.length > 0 ? searchResults[0].poster_path : null;
          addToHistory(query, posterPath, searchResults.length);
        })
        .catch((err) => {
          logError(`SearchResultsPage: Search error`, err);
          // Still add to history, but without a poster
          addToHistory(query);
        });
    }
  }, [query, lastSearchQuery, searchMovies, addToHistory, searchResults]);

  const handleSearchHistoryClick = (searchQuery: string) => {
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };
  const renderHistoryItem = (item: SearchHistoryItem) => {
    const posterUrl = item.posterPath
      ? `https://image.tmdb.org/t/p/w500${item.posterPath}`
      : null;

    return (
      <Box
        onClick={() => handleSearchHistoryClick(item.query)}
        sx={{
          cursor: "pointer",
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <Box
          sx={{
            height: { xs: 220, sm: 240, md: 270 },
            borderRadius: 2,
            overflow: "hidden",
            mb: 1,
            backgroundImage: posterUrl ? `url(${posterUrl})` : "none",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(0, 0, 0, 0.03)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {!posterUrl && (
            <SearchIcon sx={{ fontSize: 40, color: "primary.main", mb: 1 }} />
          )}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              padding: 2,
              backdropFilter: "blur(4px)",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "white",
                fontWeight: 500,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {item.query}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                display: "block",
                mt: 0.5,
              }}
            >
              {formatDistanceToNow(item.timestamp)}
              {item.resultCount !== undefined &&
                ` • ${item.resultCount} results`}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    loadMoreSearchResults().finally(() => {
      setIsLoadingMore(false);
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3, mt: 10 }}>
        <Typography variant="h4" gutterBottom>
          Search Results for "{query}"
        </Typography>

        {!isLoading && !error && searchResults.length > 0 && (
          <Typography variant="subtitle1" color="text.secondary">
            Found {searchResults.length} results
          </Typography>
        )}
      </Box>
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            my: 8,
            minHeight: "200px",
          }}
        >
          <CircularProgress size={48} />
          <Typography sx={{ mt: 2, color: "text.secondary" }}>
            Searching for movies...
          </Typography>
        </Box>
      )}
      {error && (
        <Box
          sx={(theme) => ({
            my: 4,
            p: 3,
            bgcolor:
              theme.palette.mode === "light"
                ? "rgba(211, 47, 47, 0.05)"
                : "rgba(211, 47, 47, 0.15)",
            borderRadius: 1,
            border: `1px solid ${theme.palette.error.main}`,
          })}
        >
          <Typography color="error" gutterBottom>
            Error: {error}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <button
              onClick={() => searchMovies(query)}
              style={{
                padding: "8px 16px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Retry Search
            </button>
          </Box>
        </Box>
      )}
      {!isLoading && !error && searchResults.length === 0 && (
        <Box sx={{ my: 4, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            No results found for "{query}"
          </Typography>
          <Typography color="text.secondary">
            Try different keywords or check your spelling
          </Typography>
        </Box>
      )}
      {!isLoading && !error && searchResults.length > 0 && (
        <>
          <Grid container spacing={3}>
            {searchResults.map((movie) => (
              <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
          {hasMoreSearchResults && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 4,
              }}
            >
              <LoadMoreButton
                onClick={handleLoadMore}
                text="Load More Results"
                isLoading={isLoadingMore}
                loadingText="Loading more movies..."
                size="large"
              />
              {isLoadingMore && (
                <Typography sx={{ mt: 2, color: "text.secondary" }}>
                  Loading page{" "}
                  {searchResults.length > 0
                    ? Math.ceil(searchResults.length / 20) + 1
                    : 2}{" "}
                  of results...
                </Typography>
              )}
            </Box>
          )}
        </>
      )}
      {searchHistory.length > 0 && (
        <Box sx={{ mb: 4, mt: 10 }}>
          <MoviesCarousel
            title="Your Previous Searches"
            items={searchHistory}
            renderItem={renderHistoryItem}
            itemWidth={{ xs: "140px", sm: "160px", md: "180px", lg: "200px" }}
            contentHeight="300px"
          />
        </Box>
      )}
    </Container>
  );
};

export default SearchResultsPage;
