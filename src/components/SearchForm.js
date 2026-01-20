
import React, { useState, useEffect } from 'react';

const SearchForm = ({ searchBooks }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query) {
        searchBooks(query);
      }
    }, 100);

    return () => {
      clearTimeout(handler);
    };
  }, [query, searchBooks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      searchBooks(query);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        class ="search_item"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books..."
      />
    </form>
  );
};

export default SearchForm;

