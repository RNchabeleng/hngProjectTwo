import React from 'react';
import Searchbar from '.././components/Searchbar';
import logowhite from '../assets/LogoWhite.svg';
import navigation from '../assets/Navigation.svg';
import { useSpring, animated } from 'react-spring';

interface ShowProps {
  show: boolean;
}

const Header = ({ show }: ShowProps) => {
  const springProps = useSpring({
    from: { opacity: 0, transform: 'translateY(-100px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { delay: 500, tension: 150 },
  });

  return (
    <animated.header
      style={springProps}
      className="transition-opacity duration-500 flex items-center justify-between p-4 bg-gray-100"
    >
      <img src={logowhite} alt="logo" />
      {show && <Searchbar />}
      <div className="flex items-center space-x-2">
        <p className="text-sm">Sign in</p>
        <img src={navigation} alt="menu icon" className="w-6 h-6" />
      </div>
    </animated.header>
  );
};

export default Header;
