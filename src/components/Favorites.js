import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

 
    const removeFavorite = (movieID) => {
        const updatedFavorites = favorites.filter((movie) => movie.imdbID !== movieID);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Your Favorites</h1>
            {favorites.length === 0 ? (
                <p>No favorite movies added yet.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {favorites.map((movie) => (
                        <div key={movie.imdbID} className="border p-2 relative">
                            <Link to={`/movie/${movie.imdbID}`}>
                                <img
                                    src={movie.Poster}
                                    alt={movie.Title}
                                    className="w-full h-48 object-cover"
                                />
                                <h2 className="text-lg font-bold">{movie.Title}</h2>
                                <p>{movie.Year}</p>
                            </Link>
                            <button
                                onClick={() => removeFavorite(movie.imdbID)}
                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
