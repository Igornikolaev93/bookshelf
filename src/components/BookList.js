import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BookList.css';

const BookList = ({ books, addToFavorites, removeFromFavorites, isLoggedIn, favorites = [] }) => {
  const [hoveredBookId, setHoveredBookId] = useState(null);
  const [localFavorites, setLocalFavorites] = useState({});

  // Инициализируем состояние избранных книг
  useEffect(() => {
    const initialState = {};
    books.forEach(book => {
      initialState[book.id] = favorites.some(fav => fav.id === book.id);
    });
    setLocalFavorites(initialState);
  }, [books, favorites]);

  const handleMouseEnter = (bookId) => {
    setHoveredBookId(bookId);
  };

  const handleMouseLeave = () => {
    setHoveredBookId(null);
  };

  const handleFavoriteClick = (book, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const isCurrentlyFavorite = localFavorites[book.id];
    
    if (isCurrentlyFavorite && removeFromFavorites) {
      // Удаляем из избранного
      removeFromFavorites(book.id);
      setLocalFavorites(prev => ({
        ...prev,
        [book.id]: false
      }));
    } else if (!isCurrentlyFavorite && addToFavorites) {
      // Добавляем в избранное
      addToFavorites(book);
      setLocalFavorites(prev => ({
        ...prev,
        [book.id]: true
      }));
    }
  };

  return (
    <div className="book-list-container">
      <h2 className="book-list-title">Книги</h2>
      {books.length === 0 ? (
        <p className="no-books">Книги не найдены</p>
      ) : (
        <ul className="book-list">
          {books.map(book => (
            <li 
              key={book.id} 
              className="book-card"
              onMouseEnter={() => handleMouseEnter(book.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="book-image-container">
                <Link to={`/book/${book.id}`}>
                  <img 
                    src={book.image} 
                    alt={book.title}
                    className="book-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150x200?text=No+Image';
                    }}
                  />
                  <div className={`book-overlay ${hoveredBookId === book.id ? 'show' : ''}`}>
                    <div className="overlay-content">
                      {isLoggedIn ? (
                        <button 
                          className={`favorite-btn ${localFavorites[book.id] ? 'favorite-btn-remove' : 'favorite-btn-add'}`}
                          onClick={(e) => handleFavoriteClick(book, e)}
                          title={localFavorites[book.id] ? "Удалить из избранного" : "Добавить в избранное"}
                        >
                          {localFavorites[book.id] ? '★ Удалить' : '☆ Добавить'}
                        </button>
                      ) : (
                        <div className="login-prompt">
                          Войдите, чтобы добавлять в избранное
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
              <div className="book-info">
                <Link to={`/book/${book.id}`} className="book-title">
                  {book.title}
                </Link>
                <p className="book-author">Автор: {book.author}</p>
                {book.description && (
                  <p className="book-description">
                    {book.description.length > 100 
                      ? `${book.description.substring(0, 100)}...` 
                      : book.description}
                  </p>
                )}
                {/* Индикатор избранного (всегда видимый, но небольшой) */}
                {isLoggedIn && localFavorites[book.id] && (
                  <div className="favorite-indicator">
                    <span className="favorite-star">★</span>
                    <span className="favorite-text">В избранном</span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;