import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

export const MovieView = ({ token }) => {
  const { id } = useParams(); // Use useParams to get the id from the route
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (!token || !id) return;

    const fetchMovieData = async () => {
      try {
        console.log("Fetching movie data for ID:", id);
        console.log("Using token:", token);

        const response = await fetch(
          `https://marvel-flix-c3644575f8db.herokuapp.com/movies/${movie._id}`, // Correctly forms the URL with `/movies/:id`
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const responseData = await response.json(); // Parse the response as JSON
        console.log("Movie data fetched:", responseData);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setMovie(responseData);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, [token, id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="my-4">
      <Row>
        <Col md={6}>
          <img
            src={movie.imagePath}
            alt={movie.title}
            className="img-fluid w-100 h-100"
          />
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <div className="d-flex flex-column">
                <Card.Title className="mb-2">{movie.title}</Card.Title>
                <p className="mb-3">{movie.description}</p>

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="font-weight-bold">Genre:</span>
                  <span>{movie.genre?.Name || "N/A"}</span>
                </div>

                <div className="d-flex flex-column mb-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="font-weight-bold">Director:</span>
                    <div>{movie.director?.Name || "N/A"}</div>
                  </div>
                  {(movie.director?.Bio ||
                    movie.director?.Birth ||
                    movie.director?.Death) && (
                    <div className="mt-1 ml-3">
                      {movie.director?.Bio && (
                        <div>
                          <div className="font-weight-bold">Bio:</div>
                          <div className="ml-1">{movie.director?.Bio}</div>
                        </div>
                      )}
                      <div className="d-flex">
                        {movie.director?.Birth && (
                          <div>
                            <div className="font-weight-bold">Birth:</div>
                            <div className="ml-1">{movie.director?.Birth}</div>
                          </div>
                        )}
                        {movie.director?.Death && (
                          <div className="ml-3">
                            <div className="font-weight-bold">Death:</div>
                            <div className="ml-1">{movie.director?.Death}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="font-weight-bold">Featured:</span>
                  <span>{movie.featured ? "Yes" : "No"}</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Link to={`/movies`}>
        <Button className="back-button d-flex justify-content-between align-items-center mt-4">
          Back
        </Button>
      </Link>
    </Container>
  );
};
