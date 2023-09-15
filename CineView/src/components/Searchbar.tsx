import React, { useContext } from 'react';
import { SearchContext } from '../api/searchApi';
import SearchCard from '../components/SearchCard';
import Roller from '../components/Spinner';
import searchbutton from '../assets/SearchButton.svg';

const Searchbar = () => {
  const searchContext = useContext(SearchContext);

  if (!searchContext || !searchContext.defaultMovies) {
    return <div>Loading...</div>;
  }

  const { defaultMovies, query, setQuery, results, isLoading } = searchContext;

  return (
    <div className="relative">
      <form action="" className="mb-4">
        <label className="flex items-center space-x-2 border border-gray-300 rounded p-2">
          <input
            type="text"
            placeholder="What do you want to watch?"
            className="w-full bg-transparent text-white font-normal text-base outline-none"
            value={query || ''}
            onChange={(e) => setQuery(e.target.value)}
          />
          <img src={searchbutton} alt="search icon" className="w-5 h-5" />
        </label>
      </form>
      {(query?.length !== 0 || isLoading) && (
        <div className="absolute top-12 left-0 right-0 max-w-md mx-auto bg-white text-black h-96 overflow-y-auto border border-gray-300 rounded px-4">
          {results.length > 0 ? (
            results.map((res, idx) => (
              <div key={idx} className="mb-6">
                {!isLoading ? (
                  <SearchCard
                    original_title={res.original_title}
                    overview={res.overview}
                    poster_path={res.poster_path}
                    release_date={res.release_date}
                    id={res.id}
                  />
                ) : (
                  <Roller />
                )}
              </div>
            ))
          ) : (
            defaultMovies.map((res, idx) => (
              <div key={idx} className="mb-6">
                {query!.length >= 1 ? (
                  <div className="p-8">
                    <h4 className="font-semibold text-lg">No Movies Found</h4>
                  </div>
                ) : (
                  <SearchCard
                    original_title={res.original_title}
                    overview={res.overview}
                    poster_path={res.poster_path}
                    release_date={res.release_date}
                    id={res.id}
                  />
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
