import React from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function FavoritesPage({ favorites, removeFromFavorites }) {
  const handleRemove = (imdbID, title) => {
    removeFromFavorites(imdbID);
    toast.success(`${title} removed from favorites`);
  };

  if (favorites.length === 0) {
    return (
      <div className="container">
        <div className="error" style={{ textAlign: 'center' }}>
          <h2>⭐ No favorites yet</h2>
          <p>Go to the home page and add some movies to your favorites!</p>
          <Link to="/" style={{ color: '#667eea' }}>← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 style={{ marginBottom: '20px' }}>⭐ My Favorite Movies</h1>
      <div className="movies-grid">
        {favorites.map((movie) => {
          const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster';
          
          return (
            <div key={movie.imdbID} className="movie-card">
              <Link to={`/movie/${movie.imdbID}`}>
                <img src={posterUrl} alt={movie.Title} />
                <div className="movie-info">
                  <h3>{movie.Title}</h3>
                  <p>{movie.Year}</p>
                  <div className="movie-rating">
                    <span>⭐</span>
                    <span>{movie.imdbRating || 'N/A'}</span>
                  </div>
                </div>
              </Link>
              <button
                className="favorite-btn active"
                onClick={() => handleRemove(movie.imdbID, movie.Title)}
              >
                ❌ Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FavoritesPage;