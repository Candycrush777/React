import type { Movie } from "../../types/movie";


interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="movie-card">
      <img 
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'} 
        alt={movie.Title}
        className="movie-poster"
      />
      <div className="movie-info">
        <h3 className="movie-title">{movie.Title}</h3>
        <p className="movie-year">{movie.Year}</p>
      </div>
    </div>
  );
};