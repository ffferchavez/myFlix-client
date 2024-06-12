import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    //DONT FORGET TO ADD A CONTAINER TO FILTER THE 6 PHASES OF THE MOVIES

    <Card
      onClick={() => onMovieClick(movie)}
      style={{ cursor: "pointer" }}
      className="h-100 w-100"
    >
      <Card.Img
        variant="top"
        src={movie.imagePath}
        alt={movie.title}
        style={{ objectFit: "cover", height: "450px" }}
      />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string,
      Death: PropTypes.string,
    }).isRequired,
    Featured: PropTypes.bool.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
