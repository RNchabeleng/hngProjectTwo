import axios from 'axios';
import { ReactNode, createContext, useEffect, useState } from 'react';
import Rotator from '../components/Rotator';
import React from 'react';

type MovieProviderProps = {
  children: ReactNode;
};

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  imdb_id: string | null;
}

interface MovieContextType {
  error: string | null;
  movies: Movie[] | null;
  searchMovies: Movie[] | null;
  setSearchMovies: React.Dispatch<React.SetStateAction<Movie[] | null>>;
}

export const MovieContext = createContext<MovieContextType | null>(null);

export const MovieProvider = ({ children }: MovieProviderProps) => {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [searchMovies, setSearchMovies] = useState<Movie[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<{ results: Movie[] }>(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then(async (res: { data: { results: any[]; }; }) => {
        // Fetch IMDb ID for each movie
        const moviesWithImdbId = await Promise.all(
          res.data.results.map(async (movie) => {
            const imdbResponse = await axios.get(
              `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.REACT_APP_API_KEY}`
            );
            movie.imdb_id = imdbResponse.data.imdb_id || null;
            return movie;
          })
        );

        setMovies(moviesWithImdbId);
        setSearchMovies(moviesWithImdbId);
      })
      .catch((error: { message: React.SetStateAction<string | null>; }) => {
        console.error('Error fetching top-rated movies:', error);
        setError(error.message);
      });
  }, []);

  if (movies === null && searchMovies === null) {
    return <Rotator />;
  }

  return (
    <MovieContext.Provider
      value={{ error, movies, searchMovies, setSearchMovies }}
    >
      {children}
    </MovieContext.Provider>
  );
};
