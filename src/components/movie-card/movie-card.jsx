import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    //PERHAPS I ADD A CONTAINER TO FILTER THE 6 PHASES OF THE MOVIES?

    <Link
      className="mt-5 w-100 h-100 btn-card"
      to={`/movies/${movie._id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Card className="h-100 w-100" style={{ cursor: "pointer" }}>
        <Card.Img
          variant="top"
          src={movie.ImagePath}
          alt={movie.Title}
          style={{ objectFit: "cover", height: "400px" }}
        />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Link to={`/movies/${movie._id}`}>
            <Button
              variant="link"
              style={{
                color: "red",
                textDecoration: "none",
              }}
            >
              Check Me Out!
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Phase: PropTypes.string.isRequired,
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
