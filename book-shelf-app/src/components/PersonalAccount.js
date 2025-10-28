
import React from 'react';

const PersonalAccount = ({ favorites }) => {
  return (
    <div>
      <h2>Personal Account</h2>
      <h3>Favorite Books</h3>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map(book => (
            <li key={book.id}>
              {book.title} by {book.author}
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
