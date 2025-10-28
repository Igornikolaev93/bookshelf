
import React, { useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import BookList from './components/BookList';
import SearchForm from './components/SearchForm';
import AuthModal from './components/AuthModal';
import PersonalAccount from './components/PersonalAccount';
import Genres from './components/Genres';
import BookDetails from './components/BookDetails';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const books = [
    { id: 1, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', description: 'A fantasy novel.', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'The Hobbit', author: 'J.R.R. Tolkien', description: 'A fantasy novel.', image: 'https://via.placeholder.com/150' },
    { id: 3, title: 'The Silmarillion', author: 'J.R.R. Tolkien', description: 'A fantasy novel.', image: 'https://via.placeholder.com/150' },
  ];

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleLogin = () => {
    // a mock function to simulate successful authorization
    closeAuthModal();
    navigate('/account');
  };

  const addToFavorites = (book) => {
    setFavorites([...favorites, book]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Book Shelf</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/genres">Genres</Link>
        </nav>
        <button onClick={openAuthModal}>Authorization</button>
      </header>
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <SearchForm />
              <BookList books={books} addToFavorites={addToFavorites} />
            </>
          } />
          <Route path="/account" element={<PersonalAccount favorites={favorites} />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/book/:id" element={<BookDetails books={books} />} />
        </Routes>
      </main>
      {isAuthModalOpen && <AuthModal closeModal={closeAuthModal} onLogin={handleLogin} />}
    </div>
  );
}

export default App;
