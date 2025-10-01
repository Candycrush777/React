import { Input } from "./components/ui/Input";
import { Button } from "./components/ui/Button";
import { MovieCard } from "./components/ui/MovieCard";
import { useMovies } from "./hooks/useMovies";
import "./App.css";
import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  // Usamos nuestro hook personalizado
  const { movies, loading, error, fetchMovies } = useMovies();

  return (
    <div>
      <div className="header">
        <h1>🎬 Blockbuster</h1>
      </div>

      <div className="main-container">
        <div className="search-box">
          <Input
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Buscar películas..."
          />
          <Button
            onClick={() => {
              fetchMovies(searchQuery);
              setSearchQuery(""); // aquí sí existe
            }}
            disabled={loading}
          >
            {loading ? "Buscando..." : "Buscar"}
          </Button>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {movies.length > 0 && (
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
