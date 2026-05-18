import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';

function Home({ addToFavorites, isFavorite }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/movies/popular');
      if (res.data.Search) {
        setMovies(res.data.Search);
        setTotalResults(res.data.totalResults || 0);
        setHasSearched(false);
      }
    } catch (error) {
      toast.error('Failed to load popular movies');
    }
    setLoading(false);
  };

  const searchMovies = async (query, page = 1) => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/movies/search', {
        params: { query, page }
      });
      if (res.data.Search) {
        setMovies(res.data.Search);
        setTotalResults(parseInt(res.data.totalResults) || 0);
        setSearchQuery(query);
        setCurrentPage(page);
        setHasSearched(true);
      } else {
        setMovies([]);
        setTotalResults(0);
        toast.error(res.data.error || 'No movies found');
      }
    } catch (error) {
      toast.error('Search failed');
    }
    setLoading(false);
  };

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="container">
      <div className="search-header">
        <h1>🎬 Movie Database</h1>
        <SearchBar onSearch={searchMovies} loading={loading} />
      </div>

      {loading && <div className="loading">Loading...</div>}

      {!loading && movies.length === 0 && hasSearched && (
        <div className="error">No movies found. Try another search!</div>
      )}

      {!loading && movies.length > 0 && (
        <>
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                onAddFavorite={addToFavorites}
                isFavorite={isFavorite(movie.imdbID)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => searchMovies(searchQuery, currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => searchMovies(searchQuery, currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;