import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
  Card,
  CardMedia,
  Button,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import LoadMoreButton from "../components/ui/LoadMoreButton";
import MovieCard from "../components/ui/MovieCard";
import { useMovieContext } from "../context/MovieContext";
import { logDebug, logError } from "../utils/debug";
import { useSearchHistory } from "../context/SearchHistoryContext";

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";
  const [lastSearchQuery, setLastSearchQuery] = useState<string>("");
  const { searchMovies, searchResults, isLoading, error, resetSearch } =
    useMovieContext();
  const { searchHistory } = useSearchHistory();

  // One-time initialization effect
  useEffect(() => {
    logDebug("SearchResultsPage mounted");

    return () => {
      logDebug("SearchResultsPage unmounted");
      // We'll do a final reset when the component is fully unmounted
      // This is separate from the search effect's cleanup
      resetSearch();
    };
  }, [resetSearch]); // Adding resetSearch as a dependency, but it should be stable

  // Effect to handle search query changes
  useEffect(() => {
    // Only search if query is different from what we last searched for
    if (query !== lastSearchQuery) {
      logDebug(`SearchResultsPage: Query changed to "${query}"`);
      setLastSearchQuery(query);

      // Handle empty query
      if (!query) {
        logDebug("SearchResultsPage: Empty query, no search needed");
        return;
      }

      // Perform the search
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
        })
        .catch((err) => {
          logError(`SearchResultsPage: Search error`, err);
        });
    }
  }, [query, lastSearchQuery, searchMovies]); // Removed resetSearch from dependencies

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
      {/* Enhanced loading indicator */}
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
      {/* Error message with retry button */}
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
      {/* No results message */}
      {!isLoading && !error && searchResults.length === 0 && (
        <Box sx={{ my: 4, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            No results found for "{query}"
          </Typography>
          <Typography color="text.secondary">
            Try different keywords or check your spelling
          </Typography>
        </Box>
      )}{" "}
      {/* Search results */}
      {!isLoading && !error && searchResults.length > 0 && (
        <>
          <Grid container spacing={3}>
            {searchResults.slice(0, 8).map((movie) => (
              <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>{" "}
          {searchResults.length > 8 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <LoadMoreButton
                onClick={() =>
                  (window.location.href = `/search?query=${encodeURIComponent(
                    query
                  )}&all=true`)
                }
                text="Load More Results"
              />
            </Box>
          )}
        </>
      )}
      {/* Last Search Section */}
      {searchHistory.length > 0 && (
        <Box sx={{ mb: 4, mt: 10 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 500 }}>
            Your last search
          </Typography>{" "}
          <Box
            sx={(theme) => ({
              display: "flex",
              overflowX: "auto",
              pb: 2,
              gap: 2,
              "&::-webkit-scrollbar": {
                height: "8px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor:
                  theme.palette.mode === "light"
                    ? "rgba(0,0,0,0.1)"
                    : "rgba(255,255,255,0.1)",
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor:
                  theme.palette.mode === "light"
                    ? "rgba(0,0,0,0.4)"
                    : "rgba(255,255,255,0.4)",
                borderRadius: "4px",
              },
            })}
          >
            {searchHistory.slice(0, 6).map((item, index) => (
              <Box
                key={index}
                sx={{
                  minWidth: 180,
                  transition: "transform 0.3s",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                {" "}
                <Card
                  onClick={() => {
                    if (item.query) {
                      window.location.href = `/search?query=${encodeURIComponent(
                        item.query
                      )}`;
                    }
                  }}
                  sx={{
                    height: "260px",
                    width: "100%",
                    borderRadius: "8px",
                    overflow: "hidden",
                    position: "relative",
                    transition: "transform 0.2s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.03)",
                      cursor: "pointer",
                      boxShadow: `0 14px 28px rgba(0, 0, 0, 0.4)`,
                    },
                  }}
                  elevation={3}
                >
                  {" "}
                  <CardMedia
                    component="img"
                    image="https://image.tmdb.org/t/p/w500/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg"
                    alt={`Search for ${item.query}`}
                    sx={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "8px 12px",
                      background: "rgba(0,0,0,0.6)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ color: "white", fontWeight: "medium" }}
                    >
                      {item.query}
                    </Typography>
                  </Box>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default SearchResultsPage;
