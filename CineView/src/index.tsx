import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'; // Assuming you've set up Tailwind CSS styles here
//import { MovieProvider } from './api/movie-api';
//import { BrowserRouter } from 'react-router-dom';
//import { SearchProvider } from './api/search-api';

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
