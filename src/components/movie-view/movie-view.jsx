import { useParams } from "react-router";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieView = ({ movie }) => {
  const { id } = useParams();

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="my-4">
      <Row>
        <Col md={6}>
          <Card>
            <Col md={6}>
              <img
                src={movie.imagePath}
                alt={movie.title}
                className="img-fluid"
              />
            </Col>
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <p className="mb-3">{movie.description}</p>

              <div className="d-flex justify-content-between mb-2">
                <span>
                  <strong>Genre:</strong>
                </span>
                <span>{movie.genre?.Name || "N/A"}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>
                  <strong>Director:</strong>
                </span>
                <div>{movie.director?.Name || "N/A"}</div>
                <div>{movie.director?.Bio || "N/A"}</div>
                <div>{movie.director?.Birth || "N/A"}</div>
                <div>{movie.director?.Death || "N/A"}</div>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>
                  <strong>Featured:</strong>
                </span>
                <span>{movie.featured ? "Yes" : "No"}</span>
              </div>
            </Card.Body>
            <Link to={`/`}>
              <button className="back-button">Back</button>
            </Link>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
