import React from 'react';

const Spinner = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <svg
        className="animate-spin-slow w-20 h-20 text-gray-300 dark:text-gray-700"
        viewBox="0 0 128 128"
        xmlns="http://www.w3.org/2000/svg"
      >
      </svg>
    </main>
  );
};

export default Spinner;
