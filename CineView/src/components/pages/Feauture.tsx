import React, { useContext, useState } from 'react';
import { SearchContext } from '../../api/searchApi';
import searchbutton from '../../assets/SearchButton.svg';
import Header from '../Header';
import Card from '../Card';
import Footer from '../Footer';

const Feature = () => {
  const searchContext = useContext(SearchContext);
  const [searchValue, setSearchValue] = useState('');

  if (
    !searchContext ||
    !searchContext.defaultMovies ||
    (searchContext.query === null && searchContext.results === null)
  ) {
    return <div>Loading...</div>;
  }

  const { defaultMovies, searchMovies, setSearchMovies } = searchContext;

  const onSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (!value) {
      setSearchMovies(defaultMovies);
    } else {
      const filteredMovies = defaultMovies.filter((movie) => {
        return movie.title.toLowerCase().includes(value.toLowerCase());
      });
      setSearchMovies(filteredMovies);
    }
  };

  const imagePath = 'https://image.tmdb.org/t/p/original';

  return (
    <section className="feature_container">
      <div
        className="head"
        style={{
          backgroundImage: searchMovies?.[0]
            ? `url(${imagePath + searchMovies[0]?.backdrop_path})`
            : `url(${imagePath + defaultMovies[0]?.backdrop_path})`,
        }}
      >
        <Header show={false} />
      </div>
      <form
        action=""
        className="searchBar"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label className="flex items-center space-x-2 border border-gray-300 rounded p-2">
          <input
            type="text"
            placeholder="What do you want to watch?"
            onChange={onSearchHandler}
            value={searchValue}
            className="w-full bg-transparent text-black font-normal text-base outline-none"
          />
          <img src={searchbutton} alt="search icon" className="w-5 h-5" />
        </label>
      </form>
      {searchMovies != null && searchMovies.length === 0 ? (
        <h2 className="text-center">Your Movie isn't here for now</h2>
      ) : (
        <div className="movie_deck">
          {searchMovies != null ? (
            searchMovies.map((movie) => {
              return (
                <Card
                  genre_ids={movie.genre_ids}
                  original_title={movie.original_title}
                  poster_path={movie.poster_path}
                  release_date={movie.release_date}
                  vote_average={movie.vote_average}
                  key={movie.id}
                  id={movie.imdb_id}
                />
              );
            })
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
      )}
      <Footer />
    </section>
  );
};

export default Feature;
