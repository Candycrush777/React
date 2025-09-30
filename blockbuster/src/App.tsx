import { useState } from 'react';
import { Button } from './components/ui/Button';
import { Input } from './components/ui/Input';
import { searchMovies } from './services/movieService';
import type { Movie } from './types/movie';
import './App.css';
import { MovieCard } from './components/ui/MovieCard';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    // Validación
    if (!searchQuery.trim()) {
      setError('Por favor escribe algo para buscar');
      return;
    }

    // Reset estados
    setError('');
    setLoading(true);
    setMovies([]);

    try {
      const result = await searchMovies(searchQuery);
      setMovies(result.Search);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al buscar películas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="header">
        <h1>🎬 Blockbuster</h1>
      </div>

      {/* Buscador */}
      <div className="main-container">
        <div className="search-box">
          <Input 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Buscar películas..."
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? 'Buscando...' : 'Buscar'}
          </Button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {/* Resultados */}
      {movies.length > 0 && (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;