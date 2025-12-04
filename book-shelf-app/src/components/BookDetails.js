import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import BuyModal from './BuyModal';

const BookDetails = ({ books }) => {
  const { id } = useParams();
  const book = books.find(b => b.id === id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!book) {
    return <div>Book not found</div>;
  }

  const wikiUrl = `https://en.wikipedia.org/wiki/${book.author.replace(/\s+/g, '_')}`;

  const handleBuyClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBuy = (paymentData) => {
    // Логика обработки платежа
    console.log('Покупка книги:', book.title);
    console.log('Данные платежа:', paymentData);
    
    // Здесь можно отправить данные на сервер
    
    // После успешной оплаты
    alert(`Спасибо за покупку "${book.title}"! Чек отправлен на ${paymentData.email || 'ваш email'}`);
    setIsModalOpen(false);
  };

  return (
    <div className="book-details">
      <h2>{book.title}</h2>
      <img src={book.image} alt={book.title} className="book-image" />
      <a href={wikiUrl} target="_blank" rel="noopener noreferrer">
        <h3>{book.author}</h3>
      </a>
      <p>{book.description}</p>
      <button className="buy-button" onClick={handleBuyClick}>Купить книгу</button>

      {isModalOpen && (
        <BuyModal 
          closeModal={handleCloseModal}
          onBuy={handleBuy}
          bookTitle={book.title}
        />
      )}
    </div>  
  );
};

export default BookDetails;