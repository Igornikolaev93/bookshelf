
import React from 'react';

const Genres = () => {
  const genres = ['Science Fiction', 'Comedy', 'Fantasy', 'Horror', 'Romance'];

  return (
    <div>
      <h2>Genres</h2>
      <ul>
        {genres.map(genre => (
          <li key={genre}>{genre}</li>
        ))}
      </ul>
    </div>
  );
};

export default Genres;
