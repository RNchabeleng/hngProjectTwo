require('dotenv').config();

import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/app';
import { MovieProvider } from './api/movieApi';
import { BrowserRouter } from 'react-router-dom';
import { SearchProvider } from '../src/api/searchApi';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SearchProvider>
        <MovieProvider>
          <App />
        </MovieProvider>
      </SearchProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
