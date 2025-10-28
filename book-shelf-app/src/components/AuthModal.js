
import React from 'react';

const AuthModal = ({ closeModal, onLogin }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Authorization</h2>
        <form>
          <label>
            Username:
            <input type="text" />
          </label>
          <label>
            Password:
            <input type="password" />
          </label>
          <button type="button" onClick={onLogin}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
