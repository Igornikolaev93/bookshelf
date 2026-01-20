import React from 'react';
import { Link } from 'react-router-dom';
import './Genres.css';

const Genres = () => {
  const genres = [
    { 
      name: 'Science Fiction', 
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Исследуйте галактики и будущее человечества'
    },
    { 
      name: 'Comedy', 
      image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Смешные истории и забавные ситуации'
    },
    { 
      name: 'Fantasy', 
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Мир магии, мифических существ и приключений'
    },
    { 
      name: 'Horror', 
      image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Ужасы, мистика и сверхъестественное'
    },
    { 
      name: 'Romance', 
      image: 'https://images.unsplash.com/photo-1529255484355-cb73c33c04bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Истории любви и отношений'
    },
    { 
      name: 'Mystery', 
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Детективы и загадочные происшествия'
    },
    { 
      name: 'Biography', 
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Истории реальных людей и событий'
    },
    { 
      name: 'History', 
      image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Исторические события и эпохи'
    },
  ];

  // Альтернативный вариант с использованием локальных изображений или SVG
  const genreIcons = {
    'Science Fiction': '🚀',
    'Comedy': '😄',
    'Fantasy': '🐉',
    'Horror': '👻',
    'Romance': '❤️',
    'Mystery': '🔍',
    'Biography': '📖',
    'History': '🏛️'
  };

  return (
    <div className="genres-container">
      <h2 className="genres-title">Жанры</h2>    
      <div className="genre-list">
        {genres.map(genre => (
          <Link to={`/genres/${genre.name}`} key={genre.name} className="genre-card">
            <div className="genre-image-container">
              <img 
                src={genre.image} 
                alt={genre.name}
                className="genre-image"
                onError={(e) => {
                  // Если изображение не загрузилось, показываем иконку
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `
                    <div class="genre-icon">${genreIcons[genre.name] || '📚'}</div>
                  `;
                }}
              />
              <div className="genre-overlay">
                <span className="genre-icon-fallback">{genreIcons[genre.name] || '📚'}</span>
              </div>
            </div>
            <div className="genre-content">
              <h3 className="genre-name">{genre.name}</h3>
              <p className="genre-description">{genre.description}</p>
              <span className="genre-link">Смотреть книги →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Genres;