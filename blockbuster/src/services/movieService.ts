import type { MovieSearchResponse, MovieErrorResponse } from '../types/movie';

const API_KEY = '929321f6'; // mas adelante la meteremos en una variable de entorno dependiendo lo que queramos
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

// Función para buscar películas
export const searchMovies = async (query: string): Promise<MovieSearchResponse> => {
  if (!query.trim()) {
    throw new Error('Search query cannot be empty');
  }

  const url = `${API_URL}&s=${encodeURIComponent(query)}`;

  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: MovieSearchResponse | MovieErrorResponse = await response.json();

  if (data.Response === 'False') {
    throw new Error((data as MovieErrorResponse).Error);
  }

  return data as MovieSearchResponse;
};