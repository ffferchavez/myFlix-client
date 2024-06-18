import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movieData = movies.find((mov) => mov._id === movieId);

  const [isFavorite, setIsFavorite] = useState(false); // State to track favorite status
  const [buttonText, setButtonText] = useState("Add to Favorites");
  const [buttonVariant, setButtonVariant] = useState("outline-secondary");

  // Check if movie is already in favorites when component mounts
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(storedFavorites.includes(movieId));
  }, [movieId]);

  const toggleFavorites = () => {
    // Retrieve favorites from localStorage or initialize empty array
    let storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    
    // Check if movieId is already in favorites
    if (storedFavorites.includes(movieId)) {
      // Remove movieId from favorites
      storedFavorites = storedFavorites.filter(id => id !== movieId);
      localStorage.setItem("favorites", JSON.stringify(storedFavorites));
      setIsFavorite(false); // Update local state
      setButtonText("Add to Favorites");
      setButtonVariant("outline-secondary");
    } else {
      // Add movieId to favorites
      storedFavorites.push(movieId);
      localStorage.setItem("favorites", JSON.stringify(storedFavorites));
      setIsFavorite(true); // Update local state
      setButtonText("Added to Favorites");
      setButtonVariant("primary");
    }
  };

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString("en-US", options);
  }

  return (
    <div className="bg-light m-5 rounded-3 nomargin-rf">
      <Row className="p-5 padding-sm">
        <Col md={6}>
          <h2 className="mb-2">{movieData.Title}</h2>
          <Col md={12} className="mb-4">
            <h4>Director</h4>
            <p>
              <strong>Name: </strong>
              {movieData.Director.Name}
            </p>
            <p>
              <strong>Bio: </strong>
              {movieData.Director.Bio}
            </p>
            <p>
              <strong>Birth: </strong>
              {formatDate(movieData.Director.Birth)}
            </p>
            <p>
              <strong>Death: </strong>
              {movieData.Director.Death
                ? formatDate(movieData.Director.Death)
                : "N/A"}
            </p>
          </Col>
          <Col md={12} className="mb-4">
            <h4>Genre</h4>
            <p>
              <strong>Name: </strong>
              {movieData.Genre.Name}
            </p>
            <p>
              <strong>Description: </strong>
              {movieData.Genre.Description}
            </p>
          </Col>
          <Col md={12} className="mb-4">
            <p>{movieData.Description}</p>
          </Col>
          <Col md={12} className="mb-4">
            <h4>Phase</h4>
            <p>{movieData.Phase}</p>
          </Col>
        </Col>
        <Col md={6} className="text-center mb-5">
          <img
            className="img-fluid"
            src={movieData.ImagePath}
            alt={movieData.Title}
          />
          <div className="mt-3">
            <Button variant={buttonVariant} onClick={toggleFavorites}>
              {buttonText}
            </Button>
          </div>
        </Col>
        <Col md={12}>
          <Link to={`/movies`}>
            <Button variant="primary">Back</Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
      Phase: PropTypes.string.isRequired,
      Featured: PropTypes.bool.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
        Death: PropTypes.string,
      }),
    })
  ).isRequired,
};

export default MovieView;
