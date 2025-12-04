
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PersonalAccount.css';

const PersonalAccount = ({ favorites, removeFromFavorites }) => {
  const navigate = useNavigate();

  
  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <div className="personal-account">
      <h2>Личный кабинет</h2>
      <h3>Избранное</h3>
      {favorites.length > 0 ? (
        <ul className="favorite-list">
          {favorites.map(book => (
            <li key={book.id} className="favorite-item">
              <div 
                className="favorite-content"
                onClick={() => handleBookClick(book.id)}
                style={{ cursor: 'pointer' }}
              >
                <img src={book.image} alt={book.title} />
                <div className="favorite-details">
                  <h4>{book.title}</h4>
                  <p>{book.author}</p>
                </div>
              </div>
              <button onClick={() => removeFromFavorites(book.id)}>Remove from favorites</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no favorite books yet.</p>
      )}
    </div>
  );
};

export default PersonalAccount;