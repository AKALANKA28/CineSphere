import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Movie } from "../types/movie.types";

interface WatchlistContextType {
  watchlist: Movie[];
  favorites: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  isInFavorites: (movieId: number) => boolean;
  toggleFavorite: (movie: Movie) => void;
  moveFavoriteToWatchlist: (movieId: number) => void;
  moveWatchlistToFavorite: (movieId: number) => void;
  clearWatchlist: () => void;
  clearFavorites: () => void;
  getFavoriteCategories: () => Record<string, number>;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(
  undefined
);

interface WatchlistProviderProps {
  children: ReactNode;
}

export const WatchlistProvider: React.FC<WatchlistProviderProps> = ({
  children,
}) => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);

  // Load watchlist from localStorage on component mount
  useEffect(() => {
    const savedWatchlist = localStorage.getItem("watchlist");
    const savedFavorites = localStorage.getItem("favorites");

    if (savedWatchlist) {
      try {
        setWatchlist(JSON.parse(savedWatchlist));
      } catch (error) {
        console.error("Failed to parse watchlist from localStorage", error);
        localStorage.removeItem("watchlist");
      }
    }

    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Failed to parse favorites from localStorage", error);
        localStorage.removeItem("favorites");
      }
    }
  }, []);

  // Save to localStorage whenever watchlist changes
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // Save to localStorage whenever favorites changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToWatchlist = (movie: Movie) => {
    if (!isInWatchlist(movie.id)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  const removeFromWatchlist = (movieId: number) => {
    setWatchlist(watchlist.filter((movie) => movie.id !== movieId));
  };

  const isInWatchlist = (movieId: number) => {
    return watchlist.some((movie) => movie.id === movieId);
  };
  const addToFavorites = (movie: Movie) => {
    if (!isInFavorites(movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFromFavorites = (movieId: number) => {
    setFavorites(favorites.filter((movie) => movie.id !== movieId));
  };

  const isInFavorites = (movieId: number) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const toggleFavorite = (movie: Movie) => {
    if (isInFavorites(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const moveFavoriteToWatchlist = (movieId: number) => {
    const movie = favorites.find((movie) => movie.id === movieId);
    if (movie) {
      removeFromFavorites(movieId);
      addToWatchlist(movie);
    }
  };

  const moveWatchlistToFavorite = (movieId: number) => {
    const movie = watchlist.find((movie) => movie.id === movieId);
    if (movie) {
      removeFromWatchlist(movieId);
      addToFavorites(movie);
    }
  };

  // Get counts of movies by genre categories in favorites list
  const getFavoriteCategories = () => {
    const categories: Record<string, number> = {};

    favorites.forEach((movie) => {
      movie.genre_ids.forEach((genreId) => {
        // We're just using the genre ID as the key
        const key = `genre-${genreId}`;
        categories[key] = (categories[key] || 0) + 1;
      });
    });

    return categories;
  };

  const clearWatchlist = () => {
    setWatchlist([]);
    localStorage.removeItem("watchlist");
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites");
  };
  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        favorites,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
        addToFavorites,
        removeFromFavorites,
        isInFavorites,
        toggleFavorite,
        moveFavoriteToWatchlist,
        moveWatchlistToFavorite,
        getFavoriteCategories,
        clearWatchlist,
        clearFavorites,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
};
