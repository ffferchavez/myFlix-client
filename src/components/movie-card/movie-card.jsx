import PropTypes from "prop-types";

// The MovieCard function component
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      <img src={movie.ImagePath} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <p>{movie.Description}</p>
      <p>Genre: {movie.Genre.name}</p>
      <p>Director: {movie.Director.name}</p>
      <p>Featured: {movie.Featured ? "Yes" : "No"}</p>
    </div>
  );
};

// Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    Featured: PropTypes.bool.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
