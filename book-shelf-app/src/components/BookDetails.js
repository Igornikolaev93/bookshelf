
import React from 'react';
import { useParams } from 'react-router-dom';

const BookDetails = ({ books }) => {
  const { id } = useParams();
  const book = books.find(b => b.id === parseInt(id));

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div>
      <h2>{book.title}</h2>
      <img src={book.image} alt={book.title} />
      <h3>by {book.author}</h3>
      <p>{book.description}</p>
    </div>
  );
};

export default BookDetails;
