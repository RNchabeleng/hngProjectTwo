import React from 'react';
import { Link } from 'react-router-dom';

interface SearchProps {
  poster_path: string;
  original_title: string;
  overview: string;
  release_date: string;
  id: number;
}

const SearchCard = ({
  poster_path,
  original_title,
  overview,
  release_date,
  id,
}: SearchProps) => {
  const imagePath = 'https://image.tmdb.org/t/p/original';

  return (
    <Link to={`/movies/${id}`} className="flex items-center justify-center gap-8">
      <img
        src={imagePath + poster_path}
        alt={original_title}
        className="h-20 w-20 object-cover bg-cover"
      />
      <div className="text-white">
        <h3 className="text-lg font-semibold">{original_title}</h3>
        <p className="text-gray-300">{overview}</p>
      </div>
      <div className="text-gray-400">
        <p>{release_date}</p>
      </div>
    </Link>
  );
};

export default SearchCard;
