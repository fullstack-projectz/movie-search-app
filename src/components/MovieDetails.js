import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../services/api";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );

  if (!movie)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-red-500">
          Movie details not found.
        </p>
      </div>
    );

  return (
    <>

      {/* Movie Details Section */}
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap gap-8">
          {/* Poster */}
          <div className="w-full md:w-1/3">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : "https://via.placeholder.com/500x750"
              }
              alt={movie.title}
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Movie Details */}
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-4">{movie.title}</h2>
            <p className="text-gray-600 mb-4">{movie.tagline}</p>
            <p className="mb-4">
              <strong>Overview:</strong> {movie.overview}
            </p>
            <p className="mb-4">
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p className="mb-4">
              <strong>Genres:</strong>{" "}
              {movie.genres.map((g) => g.name).join(", ")}
            </p>
            <p className="mb-4">
              <strong>Rating:</strong> {movie.vote_average} / 10
            </p>
            <p>
              <strong>Runtime:</strong> {movie.runtime} minutes
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
