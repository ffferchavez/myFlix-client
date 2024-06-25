import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../index.scss";

export const MovieCard = ({ movie }) => {
  return (
    <Link
      className="mt-5 w-100 h-100 btn-card movie-card"
      to={`/movies/${movie._id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Card className="h-100 w-100 custom-card" style={{ cursor: "pointer" }}>
        <Card.Img
          variant="top"
          src={movie.ImagePath}
          alt={movie.Title}
          style={{ objectFit: "cover", height: "600px" }}
        />
        <Card.Body className="d-flex flex-column text-center justify-content-between">
          <div>
            <Card.Title>{movie.Title}</Card.Title>
          </div>
          <div className="text-center">
            <Link
              to={`/movies/${movie._id}`}
              style={{ textDecoration: "none" }}
            >
              <Button className="checkme btn">Check Me Out!</Button>
            </Link>
          </div>
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
};

export default MovieCard;
