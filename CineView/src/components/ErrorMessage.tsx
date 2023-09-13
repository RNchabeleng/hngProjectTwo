import React from 'react';

const ErrorPage: React.FC = () => {
  return (
    <div className='error flex items-center justify-center min-h-screen'>
      <h1 className='text-4xl'>404 - Page Not Found</h1>
      <p className='text-lg'>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default ErrorPage;
