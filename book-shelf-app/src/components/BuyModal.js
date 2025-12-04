import React, { useState } from 'react';
import './BuyModal.css'; 

const BuyModal = ({ closeModal, onBuy, bookTitle = '' }) => {

  


  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    email: ''
  });

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.cardNumber || !formData.cardHolder || !formData.expiryDate || !formData.cvv) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }
    
    
    onBuy(formData);
  };

 
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({
      ...prev,
      cardNumber: formatted
    }));
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-content payment-modal">
        <span className="close-btn" onClick={closeModal}>&times;</span>
        
        <div className="modal-header">
          <h2>Оформление заказа</h2>
          {bookTitle && <p className="book-title">Книга: <strong>{bookTitle}</strong></p>}
        </div>

        <form className="payment-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Данные карты</h3>
            
            <div className="form-group">
              <label htmlFor="cardNumber">Номер карты *</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleCardNumberChange}
                maxLength="19"
                required
              />
              <div className="card-icons">
                <span className="card-icon">💳</span>
                <span className="card-icon">🔒</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="cardHolder">Имя владельца карты *</label>
              <input
                type="text"
                id="cardHolder"
                name="cardHolder"
                placeholder="IVAN IVANOV"
                value={formData.cardHolder}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">Срок действия *</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  maxLength="5"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="cvv">CVV/CVC *</label>
                <div className="cvv-input">
                  <input
                    type="password"
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    maxLength="3"
                    required
                  />
                  <span className="cvv-hint" title="3 цифры на обратной стороне карты">?</span>
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Контактная информация</h3>
            <div className="form-group">
              <label htmlFor="email">Email для чека</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-section">
            <div className="price-summary">
              <div className="price-item">
                <span>Стоимость книги:</span>
                <span className="price">499 ₽</span>
              </div>
              <div className="price-item total">
                <span>Итого к оплате:</span>
                <span className="price">499 ₽</span>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="pay-btn">
              <span className="lock-icon">🔒</span>
              599
            </button>
            <button type="button" className="cancel-btn" onClick={closeModal}>
              Отмена
            </button>
          </div>

          <div className="security-notice">
            <p>🔒 Ваши платежные данные защищены. Мы не храним информацию о вашей карте.</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyModal;