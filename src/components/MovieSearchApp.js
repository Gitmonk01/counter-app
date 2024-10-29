import { useState } from 'react';

function MovieSearchApp() {
  const [query, setQuery] = useState('');
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  const searchMovie = async () => {
    const apiKey = '2399981d';  // Replace with your OMDB API key
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?t=${query}&apikey=${apiKey}`
      );
      const data = await response.json();

      if (data.Response === 'False') {
        throw new Error(data.Error);
      }

      setMovie(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setMovie(null);
    }
  };

  return (
    <div>
      <h1>Movie Search App</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter movie title"
      />
      <button onClick={searchMovie}>Search</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {movie && (
        <div>
          <h2>{movie.Title}</h2>
          <img src={movie.Poster} alt={movie.Title} />
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>Rating:</strong> {movie.imdbRating}</p>
          <p><strong>Released:</strong> {movie.Released}</p>
        </div>
      )}
    </div>
  );
}

export default MovieSearchApp;
