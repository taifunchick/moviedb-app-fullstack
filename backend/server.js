const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/movies/search', async (req, res) => {
    try {
        const { query, page = 1 } = req.query;
        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }

        const response = await axios.get('https://www.omdbapi.com/', {
            params: {
                apikey: process.env.OMDB_API_KEY,
                s: query,
                page: page
            },
            timeout: 10000
        });

        if (response.data.Response === 'False') {
            return res.status(404).json({ error: response.data.Error });
        }

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/movies/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get('https://www.omdbapi.com/', {
            params: {
                apikey: process.env.OMDB_API_KEY,
                i: id,
                plot: 'full'
            },
            timeout: 10000
        });

        if (response.data.Response === 'False') {
            return res.status(404).json({ error: response.data.Error });
        }

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/movies/popular', async (req, res) => {
    try {
        const popularSearches = ['batman', 'superman', 'avengers', 'star wars', 'harry potter', 'lord of the rings', 'matrix', 'titanic', 'inception', 'gladiator'];
        const randomSearch = popularSearches[Math.floor(Math.random() * popularSearches.length)];
        
        console.log('Searching for:', randomSearch);
        
        const response = await axios.get('https://www.omdbapi.com/', {
            params: {
                apikey: process.env.OMDB_API_KEY,
                s: randomSearch,
                page: 1
            },
            timeout: 10000
        });

        console.log('OMDb Response:', response.data.Response);

        if (response.data.Response === 'False' || !response.data.Search) {
            return res.json({
                Search: [
                    { Title: "Batman Begins", Year: "2005", imdbID: "tt0372784", Poster: "https://via.placeholder.com/300x450?text=Batman" },
                    { Title: "Inception", Year: "2010", imdbID: "tt1375666", Poster: "https://via.placeholder.com/300x450?text=Inception" },
                    { Title: "The Dark Knight", Year: "2008", imdbID: "tt0468569", Poster: "https://via.placeholder.com/300x450?text=Dark+Knight" }
                ],
                totalResults: "3",
                Response: "True"
            });
        }

        res.json(response.data);
    } catch (error) {
        console.error('OMDb API error:', error.message);
        res.json({
            Search: [
                { Title: "Batman Begins", Year: "2005", imdbID: "tt0372784", Poster: "https://via.placeholder.com/300x450?text=Batman" },
                { Title: "Inception", Year: "2010", imdbID: "tt1375666", Poster: "https://via.placeholder.com/300x450?text=Inception" },
                { Title: "The Dark Knight", Year: "2008", imdbID: "tt0468569", Poster: "https://via.placeholder.com/300x450?text=Dark+Knight" }
            ],
            totalResults: "3",
            Response: "True"
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});