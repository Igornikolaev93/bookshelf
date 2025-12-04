
import React, { useState, useEffect } from 'react';
import BookList from './BookList';
import './BookList.css';

const GenreBookList = ({ books, addToFavorites, removeFromFavorites, fetchBooks, isLoggedIn, favorites, match }) => {
  const [genreBooks, setGenreBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    setGenreBooks(books);
    setLoading(false);
  }, [books]);

  if (loading) {
    return <div className="loading">Загрузка книг...</div>;
  }

  return (
    <div className="genre-book-list">
      <h2 className="genre-title">Книги жанра</h2>
      <BookList 
        books={genreBooks} 
        addToFavorites={addToFavorites} 
        removeFromFavorites={removeFromFavorites}  // Передаем функцию
        isLoggedIn={isLoggedIn} 
        favorites={favorites}
      />
    </div>
  );
};

export default GenreBookList;