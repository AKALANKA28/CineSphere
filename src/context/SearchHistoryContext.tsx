import React, { createContext, useContext, useState, useEffect } from "react";

export interface SearchHistoryItem {
  query: string;
  timestamp: number;
  posterPath?: string | null;
  resultCount?: number;
}

interface SearchHistoryContextType {
  searchHistory: SearchHistoryItem[];
  addToHistory: (
    query: string,
    posterPath?: string | null,
    resultCount?: number
  ) => void;
  clearHistory: () => void;
}

const SearchHistoryContext = createContext<
  SearchHistoryContextType | undefined
>(undefined);

export const useSearchHistory = () => {
  const context = useContext(SearchHistoryContext);
  if (!context) {
    throw new Error(
      "useSearchHistory must be used within a SearchHistoryProvider"
    );
  }
  return context;
};

export const SearchHistoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);

  // Load search history from localStorage on initial render
  useEffect(() => {
    const savedHistory = localStorage.getItem("movieExplorerSearchHistory");
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        // Ensure it's an array and has the expected structure
        if (
          Array.isArray(parsedHistory) &&
          parsedHistory.length > 0 &&
          "query" in parsedHistory[0]
        ) {
          setSearchHistory(parsedHistory);
        }
      } catch (error) {
        console.error(
          "Failed to parse search history from localStorage:",
          error
        );
        // Reset localStorage if corrupted
        localStorage.removeItem("movieExplorerSearchHistory");
      }
    }
  }, []);

  // Save search history to localStorage whenever it changes
  useEffect(() => {
    if (searchHistory.length > 0) {
      localStorage.setItem(
        "movieExplorerSearchHistory",
        JSON.stringify(searchHistory)
      );
    }
  }, [searchHistory]);
  // Add a search query to history, avoiding duplicates (moves to top if exists)
  const addToHistory = (
    query: string,
    posterPath?: string | null,
    resultCount?: number
  ) => {
    if (!query.trim()) return;

    setSearchHistory((prevHistory) => {
      // Remove if already exists (to move it to the top)
      const filteredHistory = prevHistory.filter(
        (item) => item.query.toLowerCase() !== query.toLowerCase()
      );

      // Add to the beginning (most recent first)
      const newItem = {
        query,
        timestamp: Date.now(),
        posterPath,
        resultCount,
      };

      // Keep only the most recent 20 queries
      const updatedHistory = [newItem, ...filteredHistory].slice(0, 20);
      return updatedHistory;
    });
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("movieExplorerSearchHistory");
  };

  return (
    <SearchHistoryContext.Provider
      value={{ searchHistory, addToHistory, clearHistory }}
    >
      {children}
    </SearchHistoryContext.Provider>
  );
};
