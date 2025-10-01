import { useState } from 'react';
import type { Movie } from '../../types/movie';


interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const [imageError, setImageError] = useState(false);
  const hasValidPoster = movie.Poster && movie.Poster !== 'N/A' && !imageError;

  return (
    <div className="movie-card">
      {hasValidPoster ? (
        <img 
          src={movie.Poster} 
          alt={movie.Title}
          className="movie-poster"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="movie-poster-placeholder">
          <span className="placeholder-icon">🎬</span>
          <span className="placeholder-text">Sin imagen</span>
        </div>
      )}
      <div className="movie-info">
        <h3 className="movie-title">{movie.Title}</h3>
        <p className="movie-year">{movie.Year}</p>
      </div>
    </div>
  );
};