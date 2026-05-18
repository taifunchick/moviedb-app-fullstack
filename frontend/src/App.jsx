import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import FavoritesPage from './pages/FavoritesPage';
import './App.css';

function App() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie) => {
    if (!favorites.some(f => f.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFromFavorites = (imdbID) => {
    setFavorites(favorites.filter(f => f.imdbID !== imdbID));
  };

  const isFavorite = (imdbID) => {
    return favorites.some(f => f.imdbID === imdbID);
  };

  return (
    <div className="app">
      <Toaster position="top-right" />
      <Navbar favoritesCount={favorites.length} />
      <Routes>
        <Route path="/" element={<Home addToFavorites={addToFavorites} isFavorite={isFavorite} />} />
        <Route path="/movie/:id" element={<MovieDetail addToFavorites={addToFavorites} isFavorite={isFavorite} />} />
        <Route path="/favorites" element={<FavoritesPage favorites={favorites} removeFromFavorites={removeFromFavorites} />} />
      </Routes>
    </div>
  );
}

export default App;