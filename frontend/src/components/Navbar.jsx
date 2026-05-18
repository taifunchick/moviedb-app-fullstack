import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ favoritesCount }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🎬 MovieDB
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/favorites" className="favorites-link">
            ⭐ Favorites ({favoritesCount})
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;