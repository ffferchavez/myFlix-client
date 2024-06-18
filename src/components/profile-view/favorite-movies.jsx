import React from "react";
import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const FavoriteMovies = ({
  favoriteMovieList,
  user,
  onFavoritesUpdate,
}) => {
  return (
    <>
      <div className="favMovies">
        <Row>
          <Col>
            <h2>Favorite Movies</h2>
          </Col>
        </Row>
        <Row>
          {favoriteMovieList.map((movie) => (
            <Col key={movie._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <MovieCard
                movieData={movie}
                user={user}
                onFavoritesUpdate={onFavoritesUpdate}
                key={movie._id}
              />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

FavoriteMovies.propTypes = {
  favoriteMovieList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
      Featured: PropTypes.bool.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
      }).isRequired,
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
        Death: PropTypes.string,
      }).isRequired,
    }).isRequired
  ).isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onFavoritesUpdate: PropTypes.func.isRequired,
};
