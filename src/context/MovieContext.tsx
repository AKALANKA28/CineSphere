import React, { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import type { Movie, Genre } from "../types/movie.types";
import {
  getPopularMovies,
  getTrendingMovies,
  getMovieGenres,
  getUpcomingMovies,
  discoverMovies as apiDiscoverMovies,
} from "../api/movieApi";
import { logDebug, logError } from "../utils/debug";

// Define filter options type for discover API
export interface DiscoverMoviesOptions {
  page?: number;
  sort_by?: string;
  with_genres?: string;
  "vote_average.gte"?: number;
  "vote_average.lte"?: number;
  "primary_release_date.gte"?: string;
  "primary_release_date.lte"?: string;
  with_original_language?: string;
  year?: number;
  include_adult?: boolean;
}

interface MovieContextProps {
  popularMovies: Movie[];
  trendingMovies: Movie[];
  upcomingMovies: Movie[];
  genres: Genre[];
  isLoading: boolean;
  error: string | null;
  searchResults: Movie[];
  searchQuery: string;
  searchTotalPages: number;
  searchCurrentPage: number;
  hasMoreSearchResults: boolean;
  discoverResults: Movie[];
  discoverTotalPages: number;
  discoverCurrentPage: number;
  isDiscoverLoading: boolean;
  hasMoreDiscoverResults: boolean;
  setSearchQuery: (query: string) => void;
  searchMovies: (query: string, page?: number) => Promise<void>;
  discoverMovies: (
    options: DiscoverMoviesOptions,
    resetResults?: boolean
  ) => Promise<void>;
  loadMoreSearchResults: () => Promise<void>;
  loadMoreDiscoverResults: () => Promise<void>;
  resetSearch: () => void;
  resetDiscover: () => void;
}

const MovieContext = createContext<MovieContextProps | undefined>(undefined);

interface MovieProviderProps {
  children: ReactNode;
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search related state
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCurrentPage, setSearchCurrentPage] = useState(1);
  const [searchTotalPages, setSearchTotalPages] = useState(1);
  const [hasMoreSearchResults, setHasMoreSearchResults] = useState(false);

  // Discover related state
  const [discoverResults, setDiscoverResults] = useState<Movie[]>([]);
  const [discoverCurrentPage, setDiscoverCurrentPage] = useState(1);
  const [discoverTotalPages, setDiscoverTotalPages] = useState(1);
  const [isDiscoverLoading, setIsDiscoverLoading] = useState(false);
  const [hasMoreDiscoverResults, setHasMoreDiscoverResults] = useState(false);
  const [currentDiscoverOptions, setCurrentDiscoverOptions] =
    useState<DiscoverMoviesOptions>({});
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);

        // Fetch data in parallel
        const [
          popularResponse,
          trendingResponse,
          upcomingResponse,
          genresResponse,
        ] = await Promise.all([
          getPopularMovies(),
          getTrendingMovies(),
          getUpcomingMovies(),
          getMovieGenres(),
        ]);

        setPopularMovies(popularResponse.results);
        setTrendingMovies(trendingResponse.results);
        setUpcomingMovies(upcomingResponse.results);
        setGenres(genresResponse.genres);
      } catch (err) {
        setError("Error fetching movie data. Please try again later.");
        console.error("Error fetching movie data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []); // Search movies with new query
  const searchMoviesHandler = async (query: string, page = 1) => {
    if (!query.trim()) {
      logDebug("Search aborted: Empty query");
      setSearchResults([]);
      setIsLoading(false);
      return Promise.resolve(); // Return resolved promise
    }

    try {
      // Set loading state
      setIsLoading(true);
      setError(null);
      logDebug(`Searching for "${query}" on page ${page}`, { isLoading: true });

      // Reset search state when starting a new search
      if (page === 1) {
        setSearchResults([]);
        setSearchCurrentPage(1);
        setSearchTotalPages(1);
        logDebug("Reset search state for new search");
      }
      let response;

      // Check if query is a genre, year, or other discoverable parameter
      // This is a simple heuristic - in a real app you might do more sophisticated parsing
      const isAdvancedQuery =
        /^(year:|genre:|rating:|before:|after:|with:|director:|cast:)/.test(
          query
        );

      console.log(`Query type: ${isAdvancedQuery ? "Advanced" : "Standard"}`);

      if (isAdvancedQuery) {
        // Parse advanced search query
        const options: any = { page };

        // Extract genre
        const genreMatch = query.match(/genre:([a-zA-Z\s]+)/);
        if (genreMatch) {
          // In a real app, you'd map genre names to IDs using the genres list
          const genreName = genreMatch[1].trim().toLowerCase();
          const genre = genres.find((g) => g.name.toLowerCase() === genreName);
          if (genre) {
            options.with_genres = genre.id.toString();
          }
        }

        // Extract year
        const yearMatch = query.match(/year:(\d{4})/);
        if (yearMatch) {
          const year = parseInt(yearMatch[1]);
          options["primary_release_date.gte"] = `${year}-01-01`;
          options["primary_release_date.lte"] = `${year}-12-31`;
        }

        // Extract "after" date
        const afterMatch = query.match(/after:(\d{4})/);
        if (afterMatch) {
          const year = parseInt(afterMatch[1]);
          options["primary_release_date.gte"] = `${year}-01-01`;
        }

        // Extract "before" date
        const beforeMatch = query.match(/before:(\d{4})/);
        if (beforeMatch) {
          const year = parseInt(beforeMatch[1]);
          options["primary_release_date.lte"] = `${year}-12-31`;
        }

        // Extract rating
        const ratingMatch = query.match(/rating:(\d+)/);
        if (ratingMatch) {
          const rating = parseInt(ratingMatch[1]);
          options["vote_average.gte"] = Math.min(rating, 10);
        }

        // Use discover API with extracted parameters
        response = await import("../api/movieApi").then((module) =>
          module.discoverMovies(options)
        );
      } else {
        // Use regular search for standard queries
        response = await import("../api/movieApi").then((module) =>
          module.searchMovies(query, page)
        );
      } // Verify that we received a valid response
      if (!response || !response.results) {
        throw new Error("Received invalid response format from API");
      }

      // Only update results after fetch completes
      if (page === 1) {
        setSearchResults(response.results);
        logDebug(
          `Setting initial search results: ${response.results.length} items`
        );
      } else {
        // Append new results to existing ones
        setSearchResults((prev) => {
          const newResults = [...prev, ...response.results];
          logDebug(`Appended results: now have ${newResults.length} items`);
          return newResults;
        });
      }

      logDebug(`Search results for "${query}"`, {
        resultsCount: response.results.length,
        currentPage: page,
        totalPages: response.total_pages,
        firstResult: response.results[0]?.title || "No results",
      });

      setSearchCurrentPage(page);
      setSearchTotalPages(response.total_pages);
      setSearchQuery(query); // Make sure to update the search query state
      setHasMoreSearchResults(page < response.total_pages);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(`Sorry, there was a problem with your search. ${errorMessage}`);
      logError("Error searching movies", err);
    } finally {
      // Ensure loading state is set to false when done
      logDebug(`Search complete, setting loading state to false`);
      setIsLoading(false);
    }

    // Return a resolved promise to allow proper promise chaining
    return Promise.resolve();
  };
  // Load more search results (next page)
  const loadMoreSearchResults = async () => {
    if (isLoading || !hasMoreSearchResults || !searchQuery) return;

    const nextPage = searchCurrentPage + 1;
    await searchMoviesHandler(searchQuery, nextPage);
  }; // Reset search state when navigating away from search results
  // Using useCallback to ensure this function remains stable across renders
  const resetSearch = React.useCallback(() => {
    // Track if component is still mounted
    let isMounted = true;

    // Log debug info - removed environment check to avoid TypeScript error
    logDebug("Resetting search state");

    // Reset loading state first
    setIsLoading(false);

    // Use setTimeout to ensure this happens asynchronously
    // This prevents state updates during rendering cycles
    setTimeout(() => {
      if (isMounted) {
        setSearchResults([]);
        setSearchQuery("");
        setSearchCurrentPage(1);
        setSearchTotalPages(1);
        setHasMoreSearchResults(false);
        setError(null);
      }
    }, 0);

    // Return a cleanup function
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array means this function never changes

  // Discover movies with filtering options
  const discoverMoviesHandler = async (
    options: DiscoverMoviesOptions,
    resetResults = true
  ) => {
    try {
      setIsDiscoverLoading(true);
      setError(null);

      // Keep track of the current options for loading more later
      setCurrentDiscoverOptions(options);

      // Determine the page to fetch
      const page = resetResults ? 1 : discoverCurrentPage + 1;

      // If resetting, clear previous results
      if (resetResults) {
        setDiscoverResults([]);
        setDiscoverCurrentPage(1);
      }

      const response = await apiDiscoverMovies({ ...options, page });

      // Update results based on whether we're resetting or appending
      if (resetResults || page === 1) {
        setDiscoverResults(response.results);
      } else {
        setDiscoverResults((prev) => [...prev, ...response.results]);
      }

      setDiscoverCurrentPage(page);
      setDiscoverTotalPages(response.total_pages);
      setHasMoreDiscoverResults(page < response.total_pages);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(`Sorry, there was a problem loading movies. ${errorMessage}`);
      console.error("Error discovering movies:", err);
    } finally {
      setIsDiscoverLoading(false);
    }
  };

  // Load more discover results
  const loadMoreDiscoverResults = async () => {
    if (isDiscoverLoading || !hasMoreDiscoverResults) return;
    await discoverMoviesHandler(currentDiscoverOptions, false);
  };

  // Reset discover state
  const resetDiscover = () => {
    setDiscoverResults([]);
    setDiscoverCurrentPage(1);
    setDiscoverTotalPages(1);
    setHasMoreDiscoverResults(false);
    setCurrentDiscoverOptions({});
  };
  return (
    <MovieContext.Provider
      value={{
        popularMovies,
        trendingMovies,
        upcomingMovies,
        genres,
        isLoading,
        error,
        searchResults,
        searchQuery,
        searchCurrentPage,
        searchTotalPages,
        hasMoreSearchResults,
        discoverResults,
        discoverCurrentPage,
        discoverTotalPages,
        isDiscoverLoading,
        hasMoreDiscoverResults,
        setSearchQuery,
        searchMovies: searchMoviesHandler,
        discoverMovies: discoverMoviesHandler,
        loadMoreSearchResults,
        loadMoreDiscoverResults,
        resetSearch,
        resetDiscover,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = (): MovieContextProps => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
};
