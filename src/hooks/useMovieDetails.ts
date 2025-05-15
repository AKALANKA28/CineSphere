import { useState, useEffect } from 'react';
import { getMovieDetails } from '../api/movieApi';
import type { MovieDetails } from '../types/movie.types';

export const useMovieDetails = (movieId: number | null) => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const movieData = await getMovieDetails(movieId);
        setMovie(movieData);
      } catch (err) {
        setError('Error loading movie details. Please try again.');
        console.error('Error fetching movie details:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return { movie, isLoading, error };
};

export default useMovieDetails;
