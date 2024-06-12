import { Container, Row, Col, Card, Button } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Container className="my-4">
      <Row>
        <Col md={6}>
          <img src={movie.imagePath} alt={movie.title} className="img-fluid" />
          <Button
            className="mt-5 w-100"
            variant="primary"
            onClick={onBackClick}
          >
            Back
          </Button>
        </Col>
        <Col md={6}>
          <Card>
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

                {/*
            DONT FORGET TO ADD ALL THE PROPS TO THE MOVIEVIEW
            MAYBE ADD MORE.

                <div>{movie.director?.Bio || "N/A"}</div>
                <div>{movie.director?.Name || "N/A"}</div>
                <div>{movie.director?.Birth || "N/A"}</div>
                <div>{movie.director?.Death || "N/A"}</div>*/}
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>
                  <strong>Featured:</strong>
                </span>
                <span>{movie.featured ? "Yes" : "No"}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
