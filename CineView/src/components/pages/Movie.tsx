import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSpring, animated } from 'react-spring';
import tickets from '../../assets/Tickets.svg';
import listbutton from '../../assets/LogoutButton.svg';
import { MovieContext } from '../../api/movieApi';
import playbutton from '../../assets/PlayButton.svg';
import home from '../../assets/Home.svg';
import projector from '../../assets/Projector.svg';
import tvshows from '../../assets/TvShows.svg';
import calendar from '../../assets/Calendar.svg';
import logodark from '../../assets/LogoDark.svg';
import logoutbutton from '../../assets/LogoutButton.svg';
import Rotator from '../Rotator';


interface Movie {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: null;
    budget: number;
    genres: Genre[];
    homepage: string | null;
    id: number;
    imdb_id: string | null;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string | null;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }
  
  // Define the Genre type
  interface Genre {
    id: number;
    name: string;
  }
  
  // Define the ProductionCompany type
  interface ProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }
  
  // Define the ProductionCountry type
  interface ProductionCountry {
    iso_3166_1: string;
    name: string;
  }
  
  // Define the SpokenLanguage type
  interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
  }
  

  // Define spring configurations
const springConfig = {
    from: { opacity: 0, transform: 'translateY(-100px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  };
  
  // Create animated style props
  const springPropsOne = useSpring(springConfig);
  const springPropsTwo = useSpring(springConfig);
  const springPropsThree = useSpring(springConfig);
  

const Movie = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const movieContext = useContext(MovieContext)!;


  const { imdb_id } = useParams<{ imdb_id: string }>();

  useEffect(() => {
    axios
      .get<Movie>(
        `https://api.themoviedb.org/3/movie/${imdb_id}?api_key=${
          process.env.REACT_APP_API_KEY
        }`
      )
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [imdb_id]);

  if (!movieContext || !movieContext.movies) {
    return <Rotator />;
  }
  const movies = movieContext.movies;

  const randomOne = Math.floor(Math.random() * 10) + 10;
  const randomTwo = Math.floor(Math.random() * 10) + 10;
  const randomThree = Math.floor(Math.random() * 10) + 10;

  const imagePath = 'https://image.tmdb.org/t/p/original';

  const date = new Date(movie?.release_date ?? '');

  const utcDate = new Date(date);

  const springProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  return (
    <section className="bg-gray-100 min-h-screen flex">
      <div className="w-1/5 bg-white p-10">
        <Link to="/">
          <img src={logodark} alt="logo" className="mb-20" />
        </Link>

        <ul className="flex flex-col gap-10 md:gap-0 md:flex-row">
          <Link to="/">
            <img src={home} alt="home icon" />
            Home
          </Link>
          <li>
            <img src={projector} alt="movie icon" />
            Movies
          </li>
          <li>
            <img src={tvshows} alt="tv icon" />
            TV Series
          </li>
          <li>
            <img src={calendar} alt="calendar icon" />
            Upcoming
          </li>
        </ul>
        <div className="play mt-8 md:mt-0">
          <h4>Play movie quizzes and earn free tickets</h4>
          <small>50k people are playing now</small>
          <p>Start playing</p>
        </div>
        <ul>
          <li>
            <img src={logoutbutton} alt="logout button" />
            Logout
          </li>
        </ul>
      </div>
      <div className="w-4/5">
        <div
          className="h-96 bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${imagePath + movie?.backdrop_path})`,
          }}
        >
          <div className="flex flex-col items-center justify-center relative">
            <img src={playbutton} alt="play icon" className="bg-opacity-35 w-14 h-14 rounded-full p-4 mb-4" />
            <h5 className="text-white text-shadow">Watch Trailer</h5>
          </div>
        </div>
        <animated.div
          style={springProps}
          className="max-w-95% mx-auto mt-4 flex items-center gap-2"
        >
          <h1 data-testid="movie-title" className="text-1rem font-medium text-gray-800">
            {movie?.original_title}
          </h1>
          <span className="w-5 h-5 rounded-full bg-gray-800"></span>
          <h2 data-testid="movie-release-date" className="text-1rem text-gray-800">
            {utcDate.toUTCString()}
          </h2>
          <span className="w-5 h-5 rounded-full bg-gray-800"></span>
          <h2 className="text-1rem text-gray-800">PG-13</h2>
          <span className="w-5 h-5 rounded-full bg-gray-800"></span>
          <h2 data-testid="movie-runtime" className="text-1rem text-gray-800">
            {movie?.runtime} mins
          </h2>
          <div className="genre flex items-center gap-2">
            {movie?.genres.map((genre, idx) => {
              return (
                <h3
                  key={idx}
                  className="border-1px border-solid border-pink-300 px-4 py-1.5 text-pink-500 font-medium rounded-full"
                >
                  {genre.name}
                </h3>
              );
            })}
          </div>
        </animated.div>
        <div className="max-w-95% mx-auto mt-6 flex flex-col md:flex-row gap-8">
          <div className="flex-grow">
            <animated.p
              style={springProps}
              data-testid="movie-overview"
              className="text-gray-600 text-0.92rem font-normal leading-normal mb-4"
            >
              {movie?.overview}
            </animated.p>
            <animated.div
              style={springProps}
              className="mb-7"
            >
              <p>
                Tagline: <span className="text-red-500">{movie?.tagline}</span>
              </p>
              <p>
                Popularity: <span className="text-gray-600">{movie?.popularity}</span>
              </p>
              <p>
                Budget: <span className="text-gray-600">{movie?.budget}</span>
              </p>
            </animated.div>
            <div className="flex items-center gap-6 text-0.92rem">
              <p className="text-white text-center w-38.75rem h-10 rounded-10px bg-red-500 font-medium flex items-center justify-center">
                Top rated movie #12
              </p>
              <p className="text-gray-800 text-center w-20rem h-10 rounded-10px border border-solid border-gray-300 bg-opacity-80 font-medium flex items-center justify-center">
                Awards 9 nominations
              </p>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="tickets">
              <p className="flex items-center justify-center gap-4 text-shadow text-1rem font-medium p-0.51rem mb-4 rounded-10px">
                <img src={tickets} alt="ticket" />
                See Showtimes
              </p>
              <p className="flex items-center justify-center gap-4 text-shadow text-1rem font-medium p-0.51rem border border-solid border-red-500 bg-opacity-10 rounded-10px">
                <img src={listbutton} alt="list button" />
                More Watch Options
              </p>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
        <div className="hidden md:block">
        {movies && movies.length > randomOne && (
  <animated.img
    style={springPropsOne}
    src={`${imagePath}${movies[randomOne]?.poster_path}`}
    alt="poster image"
    className="w-28.75rem h-48rem object-cover ml-2"
  />
)}

{movies && movies.length > randomTwo && (
  <animated.img
    style={springPropsTwo}
    src={`${imagePath}${movies[randomTwo]?.poster_path}`}
    alt="poster image"
    className="w-28.75rem h-48rem object-cover ml-2"
  />
)}

{movies && movies.length > randomThree && (
  <animated.img
    style={springPropsThree}
    src={`${imagePath}${movies[randomThree]?.poster_path}`}
    alt="poster image"
    className="w-28.75rem h-48rem object-cover ml-2"
  />
)}

  <div className="flex items-center justify-center gap-4 bg-opacity-50 bg-black backdrop-blur-lg p-3.75rem mt-1.25rem w-94% mx-auto rounded-10px">
    <img src={listbutton} alt="list icon" className="w-3.625rem h-3.625rem" />
    <small className="text-white text-shadow text-0.875rem font-medium">
      The Best Movies and Shows Currently
    </small>
  </div>
</div>

</div>
        </div>
        </section>
  );
};

export default Movie;
