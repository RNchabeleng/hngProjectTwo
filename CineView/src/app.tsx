import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../src/components/pages/Home';
import Feature from '../src/components/pages/Feauture';
import Movie from '../src/components/pages/Movie';
import ErrorMessage from './components/ErrorMessage';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/feature" element={<Feature />} />
      <Route path="/movies/:imdb_id/*" element={<Movie />} />
      <Route path="/feature/movies/:imdb_id/*" element={<Movie />} />
      <Route path="*" element={<ErrorMessage />} />
    </Routes>
  );
}

export default App;
