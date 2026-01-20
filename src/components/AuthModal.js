
import React from 'react';

const AuthModal = ({ closeModal, onLogin }) => {

      const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

   
  return (
    <div className="modal" onClick={handleBackdropClick}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Войти в Личный Кабинет</h2>
        <form class="form">
          <label>
            Логин:
            <input type="text" />
          </label>
          <label>
            Пароль:
            <input type="password" />
          </label>
          <button type="button" onClick={onLogin}>Войти</button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
