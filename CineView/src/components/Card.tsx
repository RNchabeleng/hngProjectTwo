import imdb from '../assets/imdb.svg';
import rottentomatoes from '../assets/RottenTomatoes.svg';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

interface CardProps {
  poster_path: string;
  original_title: string;
  genre_ids: number[];
  vote_average: number;
  release_date: string;
  id: string | null;
}

const Card: React.FC<CardProps> = ({
  poster_path,
  original_title,
  genre_ids,
  vote_average,
  release_date,
  id,
}) => {
  const randomRatingPercentage: number = Math.floor(Math.random() * 26) + 75;

  const genreMap: { [key: number]: string } = {
    28: 'Action',
    12: 'Adventure',
    // ... (other genre mappings)
  };

  const genreNames: string[] = genre_ids.map(
    (genreID: number) => genreMap[genreID] || ''
  );

  genreNames.sort();

  const date = new Date(release_date);
  const utcDate = new Date(date);

  const imagePath = 'https://image.tmdb.org/t/p/original';

  // Using react-spring for animation
  const springProps = useSpring({
    from: { opacity: 0, y: 100 },
    to: { opacity: 1, y: 0 },
    config: { duration: 500 },
  });

  return (
    <Link to={`./movies/${id}`} data-testid="movie-card">
      <animated.div
        style={springProps}
        className="flex items-center justify-center gap-8" // Apply Tailwind CSS classes
      >
        <div className="relative">
          <img
            src={imagePath + poster_path}
            alt={original_title}
            data-testid="movie-poster"
            className="w-64 h-96 object-cover"
          />
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-2 right-2 cursor-pointer transition-transform transform hover:rotate-360"
          >
            {/* ... (your SVG code) */}
          </svg>
        </div>
        <div className="text-center">
          <p data-testid="movie-release-date" className="text-gray-500 text-sm mt-3">
            {utcDate.toUTCString()}
          </p>
          <h3 data-testid="movie-title" className="text-xl font-semibold mt-2">
            {original_title}
          </h3>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <img src={imdb} alt="imdb icon" className="w-6" />
              <small>{vote_average} / 10</small>
            </div>
            <div className="flex items-center gap-2">
              <img src={rottentomatoes} alt="rotten tomatoes icon" className="w-6" />
              <small>{randomRatingPercentage}%</small>
            </div>
          </div>
          <div className="flex flex-wrap mt-2">
            {genreNames.slice(0, 4).map((genre, index) => (
              <p key={index} className="text-gray-500 text-sm mr-2">
                {genre}
              </p>
            ))}
          </div>
        </div>
      </animated.div>
    </Link>
  );
};

export default Card;
