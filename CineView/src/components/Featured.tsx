import React, { useContext } from 'react';
import { MovieContext } from '../api/movieApi';
import Card from '../components/Card';
import Spinner from '../components/Spinner';

const Featured = () => {
  const movieContext = useContext(MovieContext);

  if (!movieContext || !movieContext.movies) {
    return <Spinner />;
  }

  const movies = movieContext.movies;
  const firstTwelve = movies.slice(0, 10);

  return (
    <section className="max-w-screen-xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">Featured Movie</h2>
        {/* Add a link here if needed */}
      </div>
      <div className="flex flex-wrap -mx-4">
        {firstTwelve.map((movie) => (
          <div
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-8"
            key={movie.id}
          >
            <Card
              genre_ids={movie.genre_ids}
              original_title={movie.original_title}
              poster_path={movie.poster_path}
              release_date={movie.release_date}
              vote_average={movie.vote_average}
              id={movie.imdb_id}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Featured;
