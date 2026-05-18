import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import './MovieDetail.css';

function MovieDetail({ addToFavorites, isFavorite }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/movies/${id}`);
      setMovie(res.data);
    } catch (error) {
      toast.error('Failed to load movie details');
      navigate('/');
    }
    setLoading(false);
  };

  const handleAddToFavorites = () => {
    if (movie) {
      addToFavorites({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster,
        imdbRating: movie.imdbRating
      });
      toast.success('Added to favorites!');
    }
  };

  if (loading) return <div className="container loading">Loading...</div>;
  if (!movie) return null;

  const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/500x750?text=No+Poster';

  return (
    <div className="container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      
      <div className="movie-detail">
        <img src={posterUrl} alt={movie.Title} className="detail-poster" />
        
        <div className="detail-info">
          <h1>{movie.Title} ({movie.Year})</h1>
          <p className="detail-rating">⭐ {movie.imdbRating} / 10</p>
          <p><strong>Released:</strong> {movie.Released}</p>
          <p><strong>Runtime:</strong> {movie.Runtime}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Cast:</strong> {movie.Actors}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>Country:</strong> {movie.Country}</p>
          <p><strong>Language:</strong> {movie.Language}</p>
          <p><strong>Awards:</strong> {movie.Awards}</p>
          
          <button
            className={`favorite-detail-btn ${isFavorite(movie.imdbID) ? 'active' : ''}`}
            onClick={handleAddToFavorites}
            disabled={isFavorite(movie.imdbID)}
          >
            {isFavorite(movie.imdbID) ? '❤️ In Favorites' : '🤍 Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;