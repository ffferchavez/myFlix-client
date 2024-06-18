import { AccountDetails } from "./account-details";
import { FavoriteMovies } from "./favorite-movies";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const ProfileView = ({
  user,
  movies = [], // Default to an empty array if movies is undefined
  onAccountUpdate,
  onFavoritesUpdate,
}) => {
  const favoriteMovieList =
    movies && user.FavoriteMovies
      ? movies.filter((m) => user.FavoriteMovies.includes(m.movieId))
      : [];

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <AccountDetails user={user} onAccountUpdate={onAccountUpdate} />
          <FavoriteMovies
            favoriteMovieList={favoriteMovieList}
            user={user}
            onFavoritesUpdate={onFavoritesUpdate}
          />
        </Col>
      </Row>
    </Container>
  );
};
