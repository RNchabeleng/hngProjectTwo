import React, { useContext, useState } from 'react';
import { MovieContext } from '../api/movieApi';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import { useSpring, animated } from 'react-spring';
import imdb from '../assets/imdb.svg';
import rottentomatoes from '../assets/RottenTomatoes.svg';
import playbutton from '../assets/PlayButton.svg';

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const movieContext = useContext(MovieContext);

  if (!movieContext || !movieContext.movies) {
    return <Spinner />;
  }

  const movies = movieContext.movies;
  const handleNumberClick = (index: number) => {
    setActiveIndex(index);
  };

  const firstSix = movies.slice(0, 6);
  const imagePath = 'https://image.tmdb.org/t/p/original';

  const randomRating = Math.floor(Math.random() * 26) + 75;
  const randomRatingPercentage = Math.floor(Math.random() * 26) + 75;

  // Define React Spring animations
  const titleProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 1000,
    config: { tension: 150 },
  });

  const ratingProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 1300,
    config: { tension: 150 },
  });

  const overviewProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 1200,
    config: { tension: 150 },
  });

  const buttonProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 1700,
    config: { tension: 150 },
  });

  return (
    <section
      className="bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${imagePath + (firstSix[activeIndex]?.backdrop_path || '')})`,
      }}
    >
      <Header show={true} />
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center">
        <div className="w-1/2 px-8 text-white">
          <animated.h1
            style={titleProps}
            className="text-4xl font-bold mb-4"
          >
            {firstSix[activeIndex]?.title}
          </animated.h1>
          <animated.div
            style={ratingProps}
            className="rating flex items-center mb-4"
          >
            <div className="rate_tab mr-4">
              <img src={imdb} alt='imdb icon' />
              <small>{randomRating}.0 / 100</small>
            </div>
            <div className="rate_tab">
              <img src={rottentomatoes} alt='rotten tomato icon' />
              <small>{randomRatingPercentage}%</small>
            </div>
          </animated.div>
          <animated.p
            style={overviewProps}
            className="text-lg mb-4"
          >
            {firstSix[activeIndex]?.overview}
          </animated.p>
          <animated.button
            style={buttonProps}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full flex items-center"
          >
            <img src={playbutton} alt='play icon' className="w-6 h-6 mr-2" /> Watch Trailer
          </animated.button>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          {Array.from({ length: 6 }, (_, index) => (
            <p
              key={index}
              className={`text-2xl mr-4 cursor-pointer ${
                activeIndex === index + 1 ? 'active' : ''
              }`}
              onClick={() => handleNumberClick(index + 1)}
            >
              {index + 1}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
