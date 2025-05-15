import axios from 'axios';
import type { MoviesResponse, MovieDetails, GenresResponse, Movie } from '../types/movie.types';
import { logDebug, logError } from '../utils/debug';

// Create axios instance with base URL and common headers
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`
  },
});

// Axios error handler with user-friendly messages
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Request made but server responded with error
      const status = error.response.status;
      let message = 'Something went wrong with the request';
      
      if (status === 401) {
        message = 'Authorization failed. Please check your API credentials.';
      } else if (status === 404) {
        message = 'The requested resource could not be found.';
      } else if (status === 429) {
        message = 'You have exceeded your rate limit. Please try again later.';
      } else if (status >= 500) {
        message = 'Server error. Please try again later.';
      }
      
      console.error(`API Error ${status}: ${message}`);
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // Request made but no response received
      console.error('Network Error: No response received');
      return Promise.reject(new Error('Network error. Please check your connection.'));
    } else {
      // Something else happened
      console.error('Error:', error.message);
      return Promise.reject(error);
    }
  }
);

// Fetch popular movies from all available years
export const getPopularMovies = async (page = 1): Promise<MoviesResponse> => {
  try {
    const response = await api.get('/movie/popular', { 
      params: { 
        page,
        language: 'en-US',
        // No year filter to get all movies
      } 
    });
    return response.data;
  } catch (error) {
    console.error('Get popular movies error:', error);
    throw error;
  }
};

// Fetch trending movies from all available years
export const getTrendingMovies = async (timeWindow: 'day' | 'week' = 'week'): Promise<MoviesResponse> => {
  try {
    const response = await api.get(`/trending/movie/${timeWindow}`, {
      params: {
        language: 'en-US',
        // No year parameter, so we get all years
      }
    });
    return response.data;
  } catch (error) {
    console.error('Get trending movies error:', error);
    throw error;
  }
};

// Fetch upcoming movies
export const getUpcomingMovies = async (page = 1): Promise<MoviesResponse> => {
  try {
    const response = await api.get('/movie/upcoming', {
      params: {
        page,
        language: 'en-US',
        region: 'US', // Optional: specifies which country's release dates to use
      }
    });
    return response.data;
  } catch (error) {
    console.error('Get upcoming movies error:', error);
    throw error;
  }
};

// Fetch movie details by ID
export const getMovieDetails = async (movieId: number): Promise<MovieDetails> => {
  const response = await api.get(`/movie/${movieId}`);
  return response.data;
};

// Discover movies with various filtering options
export const discoverMovies = async (options: {
  page?: number;
  sort_by?: string;
  with_genres?: string;
  'vote_average.gte'?: number;
  'vote_average.lte'?: number;
  'primary_release_date.gte'?: string;
  'primary_release_date.lte'?: string;
  with_original_language?: string;
  year?: number;
  include_adult?: boolean;
  with_keywords?: string;
} = {}): Promise<MoviesResponse> => {
  try {
    const response = await api.get('/discover/movie', {
      params: {
        page: options.page || 1,
        include_adult: options.include_adult !== undefined ? options.include_adult : false,
        language: 'en-US',
        ...options
      }
    });
    return response.data;
  } catch (error) {
    console.error('Discover movies error:', error);
    throw error;
  }
};

// Search for movies by query with proper error handling
export const searchMovies = async (query: string, page = 1): Promise<MoviesResponse> => {
  try {
    logDebug(`API call: Searching for "${query}" on page ${page}`);
    
    // Track API call time
    const startTime = performance.now();
    
    // Include_adult=false filters out adult content, language=en-US for English results
    // We're not filtering by year to get all available movies
    const response = await api.get('/search/movie', { 
      params: { 
        query, 
        page, 
        include_adult: false,
        language: 'en-US',
        // No year filter, so we get all movies regardless of release date
      },
      timeout: 10000 // 10 second timeout
    });
    
    const endTime = performance.now();
    logDebug(`API response received in ${Math.round(endTime - startTime)}ms: Found ${response.data.results.length} results for "${query}"`);
    
    // Validate response format
    if (!response.data || !Array.isArray(response.data.results)) {
      throw new Error('Invalid API response format');
    }
    
    return response.data;
  } catch (error) {
    logError(`Search movies error for "${query}"`, error);
    if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
      throw new Error('Search request timed out. Please try again.');
    }
    throw error;
  }
};

// Fetch movie genres
export const getMovieGenres = async (): Promise<GenresResponse> => {
  const response = await api.get('/genre/movie/list');
  return response.data;
};

// Fetch movie videos (trailers, teasers, etc.)
export interface VideoResult {
  id: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

export interface VideoResponse {
  id: number;
  results: VideoResult[];
}

export const getMovieVideos = async (movieId: number): Promise<VideoResponse> => {
  const response = await api.get(`/movie/${movieId}/videos`);
  return response.data;
};

// Get similar movies
export const getSimilarMovies = async (movieId: number): Promise<MoviesResponse> => {
  const response = await api.get(`/movie/${movieId}/similar`);
  return response.data;
};

// Interface for cast and crew members
export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface CreditsResponse {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

// Get movie cast and crew information
export const getMovieCredits = async (movieId: number): Promise<CreditsResponse> => {
  try {
    const response = await api.get(`/movie/${movieId}/credits`);
    return response.data;
  } catch (error) {
    console.error('Get movie credits error:', error);
    throw error;
  }
};

// Get movie recommendations
export const getMovieRecommendations = async (movieId: number): Promise<MoviesResponse> => {
  try {
    const response = await api.get(`/movie/${movieId}/recommendations`);
    return response.data;
  } catch (error) {
    console.error('Get movie recommendations error:', error);
    throw error;
  }
};

// Interface for movie collection
export interface MovieCollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

// Interface for full collection details including parts
export interface CollectionDetails {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  parts: Movie[];
}

// Get collection details
export const getCollectionDetails = async (collectionId: number): Promise<CollectionDetails> => {
  try {
    const response = await api.get(`/collection/${collectionId}`);
    return response.data;
  } catch (error) {
    console.error('Get collection details error:', error);
    throw error;
  }
};

// Get movies by specific endpoint (popular, top_rated, upcoming, etc)
export const getMoviesByEndpoint = async (endpoint: string, page = 1): Promise<MoviesResponse> => {
  try {
    const validEndpoints = ['popular', 'top_rated', 'upcoming', 'now_playing'];
    const finalEndpoint = validEndpoints.includes(endpoint) ? endpoint : 'popular';
    
    logDebug(`Fetching ${finalEndpoint} movies, page ${page}`);
    const response = await api.get(`/movie/${finalEndpoint}`, {
      params: {
        language: 'en-US',
        page,
        region: 'US'
      }
    });
    return response.data;
  } catch (error) {
    logError('Get movies by endpoint error:', error);
    throw error;
  }
};

export default api;
