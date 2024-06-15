import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movieData = movies.find((mov) => mov._id === movieId);

  if (!movieData) {
    return <div>Loading...</div>;
  }

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString("en-US", options);
  }

  return (
    <div className="bg-light m-5 rounded-3 nomargin-rf">
      <Row className="p-5 padding-sm">
        <Col md={6}>
          <h2 className="mb-2">{movieData.Title}</h2>
          <Row className="mb-4 text-secondary">
            <Col md="auto">
              <h4>{movieData.Director.Name}</h4>
            </Col>
            <Col></Col>
            <Col md="auto">
              <h5 className="text-dark">{movieData.Genre.Name}</h5>
            </Col>
          </Row>
          <Col md={12} className="mb-4">
            <p>{movieData.Description}</p>
          </Col>
          <Col md={12} className="mb-4">
            <h4>Director</h4>
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
              <strong>Description: </strong>
              {movieData.Genre.Description}
            </p>
          </Col>
        </Col>
        <Col md={6} className="text-center mb-5">
          <img
            className="img-fluid"
            src={movieData.ImagePath}
            alt={movieData.Title}
          />
        </Col>
        <Col md={12}>
          <Link to={`/`}>
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
