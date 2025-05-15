import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface SearchHistoryItem {
  query: string;
  timestamp: number;
}

interface SearchHistoryContextType {
  searchHistory: SearchHistoryItem[];
  addToSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
}

const SearchHistoryContext = createContext<
  SearchHistoryContextType | undefined
>(undefined);

interface SearchHistoryProviderProps {
  children: ReactNode;
}

export const SearchHistoryProvider: React.FC<SearchHistoryProviderProps> = ({
  children,
}) => {
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const { isAuthenticated, user } = useAuth();

  // Load search history from localStorage when component mounts or user changes
  useEffect(() => {
    if (isAuthenticated && user) {
      const userId = user.id;
      const savedHistory = localStorage.getItem(`searchHistory_${userId}`);

      if (savedHistory) {
        try {
          setSearchHistory(JSON.parse(savedHistory));
        } catch (error) {
          console.error(
            "Failed to parse search history from localStorage",
            error
          );
          localStorage.removeItem(`searchHistory_${userId}`);
        }
      }
    } else {
      // Clear search history when user logs out
      setSearchHistory([]);
    }
  }, [isAuthenticated, user]);

  // Save to localStorage whenever search history changes
  useEffect(() => {
    if (isAuthenticated && user) {
      const userId = user.id;
      localStorage.setItem(
        `searchHistory_${userId}`,
        JSON.stringify(searchHistory)
      );
    }
  }, [searchHistory, isAuthenticated, user]);

  const addToSearchHistory = (query: string) => {
    if (!isAuthenticated || !user || !query.trim()) return;

    const newItem: SearchHistoryItem = {
      query: query.trim(),
      timestamp: Date.now(),
    };

    // Check if query already exists, and if so, move it to the top
    const filteredHistory = searchHistory.filter(
      (item) => item.query.toLowerCase() !== query.toLowerCase()
    );

    // Add new item at the beginning and limit to 10 most recent searches
    setSearchHistory([newItem, ...filteredHistory].slice(0, 10));
  };

  const clearSearchHistory = () => {
    if (!isAuthenticated || !user) return;

    setSearchHistory([]);
    const userId = user.id;
    localStorage.removeItem(`searchHistory_${userId}`);
  };

  return (
    <SearchHistoryContext.Provider
      value={{
        searchHistory,
        addToSearchHistory,
        clearSearchHistory,
      }}
    >
      {children}
    </SearchHistoryContext.Provider>
  );
};

export const useSearchHistory = (): SearchHistoryContextType => {
  const context = useContext(SearchHistoryContext);
  if (context === undefined) {
    throw new Error(
      "useSearchHistory must be used within a SearchHistoryProvider"
    );
  }
  return context;
};
