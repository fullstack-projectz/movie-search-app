import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { searchMovies } from '../services/api';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);

    const fetchMovies = async () => {
        try {
            setError(null);
            const data = await searchMovies(query, page);
            if (data.Response === 'True') {
                setMovies(data.Search);
            } else {
                setMovies([]);
                setError(data.Error);
            }
        } catch (err) {
            setError('Failed to fetch movies. Try again later.');
        }
    };

    useEffect(() => {
        if (query) fetchMovies();
    }, [query, page]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Movie Search</h1>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for movies..."
                className="p-2 border rounded w-full mb-4"
            />
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {movies.map((movie) => (
                    <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID}>
                        <div className="border p-2">
                            <img src={movie.Poster} alt={movie.Title} className="w-full h-48 object-cover" />
                            <h2 className="text-lg font-bold">{movie.Title}</h2>
                            <p>{movie.Year}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className="p-2 bg-blue-500 text-white rounded"
                >
                    Previous
                </button>
                <button
                    onClick={() => setPage((prev) => prev + 1)}
                    className="p-2 bg-blue-500 text-white rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default SearchPage;
