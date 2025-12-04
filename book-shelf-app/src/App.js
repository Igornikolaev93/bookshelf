import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import BookList from './components/BookList';
import AuthModal from './components/AuthModal';
import PersonalAccount from './components/PersonalAccount';
import Genres from './components/Genres';
import BookDetails from './components/BookDetails';
import GenreBookList from './components/GenreBookList';
import SearchForm from './components/SearchForm';
import StoreMap from './components/StoreMap';


function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [books, setBooks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Данные магазинов
  const bookStores = [
    {
      id: '1',
      name: 'Дом книги «Москва»',
      address: 'ул. Тверская, 8, Москва',
      latitude: 55.760456,
      longitude: 37.607594,
      workingHours: '10:00 - 22:00',
      phone: '+7 (495) 123-45-67'
    },
    {
      id: '2',
      name: 'Библио-Глобус',
      address: 'Мясницкая ул., 6/3, стр. 1, Москва',
      latitude: 55.761876,
      longitude: 37.628820,
      workingHours: '09:00 - 21:00',
      phone: '+7 (495) 928-35-67'
    },
    {
      id: '3',
      name: 'Читай-город',
      address: 'ул. Новый Арбат, 21, Москва',
      latitude: 55.752280,
      longitude: 37.593672,
      workingHours: '10:00 - 23:00',
      phone: '+7 (495) 777-88-99'
    },
    {
      id: '4',
      name: 'Московский Дом Книги',
      address: 'ул. Арбат, 28, Москва',
      latitude: 55.750307,
      longitude: 37.590692,
      workingHours: '09:00 - 22:00',
      phone: '+7 (495) 789-12-34'
    },
    {
      id: '5',
      name: 'Лабиринт',
      address: 'ул. Земляной Вал, 64, Москва',
      latitude: 55.757960,
      longitude: 37.656810,
      workingHours: '10:00 - 21:00',
      phone: '+7 (495) 456-78-90'
    }
  ];

  const fetchBooks = useCallback((query) => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
      .then(response => response.json())
      .then(data => {
        if (data.items) {
          const formattedBooks = data.items.map(item => ({
            id: item.id,
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author',
            description: item.volumeInfo.description,
            image: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150'
          }));
          setBooks(formattedBooks);
        }
      });
  }, []);

  useEffect(() => {
    fetchBooks('subject:fiction');
  }, [fetchBooks]);

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    closeAuthModal();
    navigate('/account');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFavorites([]);
    navigate('/');
  };

  const addToFavorites = (book) => {
    setFavorites(prevFavorites => [...prevFavorites, book]);
  };

  const removeFromFavorites = (bookId) => {
    setFavorites(prevFavorites => prevFavorites.filter(book => book.id !== bookId));
  };

  const handleStoreSelect = (store) => {
    console.log('Выбран магазин:', store);
    alert(`Выбран магазин: ${store.name}\nАдрес: ${store.address}\nТелефон: ${store.phone}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Книжная полка</h1>
        <SearchForm searchBooks={fetchBooks} />
        <nav>
          <Link to="/">Главная</Link>
          <Link to="/genres">Жанры</Link>
          <Link to="/stores">Магазины</Link>
          {isLoggedIn && <Link to="/account">Избранное</Link>}
        </nav>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Выйти</button>
        ) : (
          <button onClick={openAuthModal}>Войти</button>
        )}
      </header>
      <main>
        <Routes>
          <Route path="/" element={
          <BookList 
            books={books} 
            addToFavorites={addToFavorites} 
            removeFromFavorites={removeFromFavorites}  
            isLoggedIn={isLoggedIn} 
            favorites={favorites}
          />
        } />
          <Route path="/account" element={<PersonalAccount favorites={favorites} removeFromFavorites={removeFromFavorites} />} />
          <Route path="/genres" element={<Genres />} />
          
          <Route path="/genres/:genreName" element={
            <GenreBookList 
              books={books} 
              addToFavorites={addToFavorites} 
              removeFromFavorites={removeFromFavorites}
              fetchBooks={fetchBooks} 
              isLoggedIn={isLoggedIn} 
              favorites={favorites}
            />
          } />
          <Route path="/book/:id" element={<BookDetails books={books} />} />
          {/* Маршрут для магазинов */}
          <Route path="/stores" element={
            <div className="stores-page">
              <h2>Книжные магазины Москвы</h2>
              <div className="stores-description">
                <p>Найдите ближайший книжный магазин. Кликните на метку для получения информации.</p>
              </div>
              <div className="map-container">
                {bookStores.length > 0 ? (
                  <StoreMap 
                    stores={bookStores}
                    center={[55.7558, 37.6173]}
                    zoom={11}
                    onStoreSelect={handleStoreSelect}
                  />
                ) : (
                  <div className="no-stores-message">Загрузка карты...</div>
                )}
              </div>
              <div className="stores-list">
                <h3>Список магазинов:</h3>
                <ul>
                  {bookStores.map(store => (
                    <li key={store.id}>
                      <strong>{store.name}</strong><br />
                      <span className="store-address">📍 {store.address}</span><br />
                      <span className="store-hours">🕒 {store.workingHours}</span><br />
                      <span className="store-phone">📞 {store.phone}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          } />
        </Routes>
      </main>
      {isAuthModalOpen && <AuthModal closeModal={closeAuthModal} onLogin={handleLogin} />}
    </div>
  );
}

export default App;