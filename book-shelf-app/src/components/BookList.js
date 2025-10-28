
import React from 'react';
import { Link } from 'react-router-dom';

const BookList = ({ books, addToFavorites }) => {
  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <Link to={`/book/${book.id}`}>{book.title}</Link> by {book.author}
            <button onClick={() => addToFavorites(book)}>Add to Favorites</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
