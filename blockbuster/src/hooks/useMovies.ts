import { useState } from 'react';
import type { Movie, MovieSearchResponse } from '../types/movie';
import { searchMovies } from '../services/movieService';

export const useMovies = () => {
  // Estado de películas
  const [movies, setMovies] = useState<Movie[]>([]);
  // Estado de loading
  const [loading, setLoading] = useState(false);
  // Estado de error
  const [error, setError] = useState<string>('');

  // Función para buscar películas
  const fetchMovies = async (query: string) => {
    // Validación: no buscar si la query está vacía
    if (!query.trim()) {
      setError('Por favor escribe algo para buscar');
      return;
    }

    // Reset estados antes de la búsqueda
    setError('');
    setLoading(true);
    setMovies([]);

    try {
      // Llamada a la API
      const result: MovieSearchResponse = await searchMovies(query);

      // Guardamos las películas en estado
      setMovies(result.Search || []);
      
   
    } catch (err: unknown) {
      // Type guard: asegurarnos que es un Error
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al buscar películas');
      }
    } finally {
      setLoading(false);
    }
  };

  // Devolvemos todo lo que necesita la UI
  return {
    movies,
    loading,
    error,
    fetchMovies,
  };
};

