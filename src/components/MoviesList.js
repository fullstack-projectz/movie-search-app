import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPopularMovies, searchMovies } from "../services/api";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchPopularMovies(); 
        setMovies(data.results); 
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Unable to fetch movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (searchQuery.trim()) {
        const data = await searchMovies(searchQuery); 
        setMovies(data.results);
      } else {
        const data = await fetchPopularMovies();
        setMovies(data.results);
      }
    } catch (error) {
      console.error("Error searching movies:", error);
      setError("Unable to search for movies.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>{error}</p>;
  if (movies.length === 0) return <p>No movies available.</p>;

  return (
    <div>
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for movies..."
          className="p-2 border border-gray-300 rounded w-3/4 mt-5 ml-16"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded ml-2">
          Search
        </button>
      </form>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className="border p-2 hover:shadow-lg"
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : "https://via.placeholder.com/300x450"
              }
              alt={movie.title}
              className="w-full h-64 object-cover"
            />
            <h2 className="text-lg font-bold mt-2">{movie.title}</h2>
            <p>Release Date: {movie.release_date}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
