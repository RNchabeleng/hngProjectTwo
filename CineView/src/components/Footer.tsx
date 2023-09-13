import React from 'react';
import facebook from '../../assets/facebook.svg';
import insta from '../../assets/insta.svg';
import twitter from '../../assets/twitter.svg';
import youtube from '../../assets/youtube.svg';

const Footer: React.FC = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto flex justify-center items-center gap-12">
        <div className="flex gap-12">
          <img src={facebook} alt="Facebook" />
          <img src={insta} alt="Instagram" />
          <img src={twitter} alt="Twitter" />
          <img src={youtube} alt="YouTube" />
        </div>
        <div className="text-gray-600">
          <ul className="flex flex-col items-center space-y-4 md:space-y-0 md:flex-row md:space-x-8">
            <li className="text-sm font-semibold">Conditions of Use</li>
            <li className="text-sm font-semibold">Privacy & Policy</li>
            <li className="text-sm font-semibold">Press Room</li>
          </ul>
        </div>
      </div>
      <p className="text-center text-gray-600 mt-8">
        © 2021 MovieBox by Adriana Eka Prayudha
      </p>
    </section>
  );
};

export default Footer;
