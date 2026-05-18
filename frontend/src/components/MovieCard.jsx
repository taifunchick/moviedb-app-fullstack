import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

function MovieCard({ movie, onAddFavorite, onRemoveFavorite, isFavorite }) {
  const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster';

  return (
    <div className="movie-card">
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
        className={`favorite-btn ${isFavorite ? 'active' : ''}`}
        onClick={() => {
          if (isFavorite) {
            onRemoveFavorite(movie.imdbID);
          } else {
            onAddFavorite(movie);
          }
        }}
      >
        {isFavorite ? '❤️ Added' : '🤍 Add to Favorites'}
      </button>
    </div>
  );
}

export default MovieCard;